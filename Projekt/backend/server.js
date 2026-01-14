import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { pool } from "./db.ts";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Frontend-Origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const TMDB_Token = process.env.TMDB_Token;
const PGRST = process.env.PGRST_URL;

// DB durchgeben
app.get("/api/movie", async (req, res) => {
  try{
    const r = await pool.query(
      `SELECT 
        m.*,
        COALESCE(
          json_agg(p.time ORDER BY p.time)
          FILTER (WHERE p.programtimeid IS NOT NULL),
          '[]'
          ) AS programtime  
      FROM movie m
      LEFT JOIN programtime p ON m.movieid = p.fk_movieid
      GROUP BY m.movieid`
    )
    res.status(200).json(r.rows);
  }
  catch(e){
    res.status(400).json({ message: 'Movie konnte nicht geladen werden.'});
  }
});


app.get("/api/movie/:id", async (req, res) => {
  const id = Number(req.params.id);
  const r = await fetch(`${PGRST}/movie?movieid=eq.${id}&limit=1&select=*, programtime(time)`);
  res.status(r.status).send(await r.text());
});

// TMDB Suchfunktion
app.get("/api/tmdb/search", async (req, res) => {
    const q = req.query.q;
    const r = await fetch(
       `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&language=de-CH`,
       { headers: { Authorization: `Bearer ${TMDB_Token}` }} 
    );
    res.status(r.status).send(await r.text());
});

// Refresh Token Store
const refreshStore = new Map();

function signAccessToken(user){
  return jwt.sign(
    { sub: user.userid, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES || "10m" }
  );
}

function signRefreshToken(user){
  return jwt.sign(
    {sub: user.userid },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRES || "30m" }
  );
}

function setRefreshCookie(res, token){
  res.cookie("refresh_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/refresh",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
  })
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; // {sub,email,role,iat,exp}
    next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}

// Routes

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const emailNorm = email.trim().toLowerCase();

  const r = await pool.query(
    `SELECT * FROM AppUser WHERE email = $1`,
    [emailNorm]
  );

  if (r.rowCount === 0) return res.status(401).json({ message: "Invalid credentials" });

  const user = r.rows[0];
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json( {message: "Invalid credentials"})

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  const key = String(user.userid);
  refreshStore.set(key, refreshToken);
  setRefreshCookie(res, refreshToken);

  res.json({
    accessToken,
    user: { id: user.userId, email: user.email }
  });
});

// Refresh
app.post("/api/auth/refresh", async (req, res) => {
  const rt = req.cookies.refresh_token;
  if (!rt) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
    const userId = String(payload.sub);
    const stored = refreshStore.get(userId);
    if (stored !== rt) return res.status(401).json({ message: "Refresh token revoked" });

    const r = await pool.query(
    `SELECT * FROM AppUser WHERE userId = $1`,
    [userId]
    );
    const user = r.rows[0];

    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccess = signAccessToken(user);
    res.json({ accessToken: newAccess });
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  const rt = req.cookies.refresh_token;
  if (rt) {
    try {
      const payload = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
      refreshStore.delete(payload.sub);
    } catch {}
  }
  res.clearCookie("refresh_token", { path: "/api/auth/refresh" });
  res.json({ ok: true });
});

// test endpunkt
app.get("/api/me", authRequired, (req, res) => {
  res.json({ user: req.user });
});

// user hinzufügen
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body ?? {};

  if (!email || !password || !username) return res.status(400).json({ message: "Missing data" });
  if (password.length < 8) return res.status(400).json({ message: "Password too short" });

  const usernameNorm = username.trim();
  const emailNorm = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  try{
    const r = await pool.query(
      `INSERT INTO AppUser (name, email, password)
      VALUES($1, $2, $3)
      RETURNING UserID, name, email`,
      [usernameNorm, emailNorm, passwordHash]
    )
    res.status(201).json(r.rows[0])
  }catch(e){
    if (e.code === "23505") return res.status(409).json({ message: "Email exists" });
    console.log(e);
    return res.status(500).json({ message: "register failed" });
  }
});

// room
app.post("/api/room", async (req, res) => {
  const { name } = req.body ?? {};
  
  if (!name) return res.status(400).json({message: "Missing Data"});

  try{
    const r = await pool.query(
      `INSERT INTO Room (name)
      VALUES ($1)
      RETURNING *`,
      [name]
    )
    return res.status(200).json(rows[0]);
  }
  catch(e){ 
      return res.status(500).json({message: "Room failed"})
    }
})

app.get("/api/rooms", async (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  const url = `${PGRST}/room?select=*${qs ? "&" + qs : ""}`;

  const r = await fetch(url);
  res.status(r.status).send(await r.text());
})

app.get("/api/room", async (req, res) => {
  const { movieId, date, time } = req.query;

  if (!movieId || !date || !time) {
    return res.status(400).json({ message: "missing parameters" });
  }

  try {
    const r = await pool.query(
      `
      SELECT
        r.roomid,
        r.name,
        r.description
      FROM show s
      JOIN room r ON r.roomid = s.fk_room_id
      WHERE s.fk_movie_id = $1
        AND s.date = $2
        AND s.start_time = $3
      `,
      [movieId, date, time]
    );

    return res.status(200).json(r.rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "rooms could not be loaded" });
  }
});


// show
app.post("/api/show", async (req, res) => {
  const {movieId, roomId, startTime, price } = req.body ?? {};
  
  if(!movieId || !roomId || !startTime || !price) return res.status(400).json({ message: "Missing Data"})
  
  try{
    const r = await pool.query(
      `INSERT INTO Show (fk_movie_id, fk_room_id, start_time, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *`
      [movieId, roomId, startTime, price]
    )
    return res.status(200).json(r.rows[0])
  }catch(e){
    return res.status(500).json({ message: "Show failed!"})
  }
})

app.get("/api/show", async (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  const url = `${PGRST}/show?select=*${qs ? '&' + qs : ''}`

  const r = await fetch(url);
  return res.status(r.status).send(await r.text());
})

// ticket
app.post("/api/ticket", async (req, res) => {
  const { showId, userId} = req.body ?? {};

  if(!showId || !userId) return res.status(400).json({message: "Missing Data"});

  try{
    const r = await pool.query(
      `INSERT INTO Ticket (fk_showID, fk_userID)
      VALUES($1, $2)
      RETURNING *`,
      [showId, userId]
    )
    return res.status(200).json(r.rows[0])
  }catch(e){
    return res.status(500).json({message: "ticket failed"})
  }
})

app.get("/api/ticket", async (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  const url = `${PGRST}/ticket?select=*${qs ? '&' + qs : ''}`

  const r = await fetch(url);
  return res.status(r.status).send(await r.text());
})

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}

app.post("/api/cart", requireAuth, async (req, res) => {
  const userId = req.user.sub;
  const { movieId, roomName, startTime, date, price } = req.body ?? {};

  if( !movieId || userId == null || !roomName || !startTime || price == null || !date) return res.status(400).json({message: "Missing data"})

  const client = await pool.connect();

  try{
    await client.query("BEGIN");

    const r = await client.query(
      `INSERT INTO Room (name)
      VALUES ($1)
      RETURNING RoomID`,
      [roomName]
    )

    const roomId = r.rows[0].roomid;
  
    const s = await client.query(
      `INSERT INTO Show (fk_movie_id, fk_room_id, start_time, date, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING ShowID`,
      [movieId, roomId, startTime, date, price]
    )

    const showId = s.rows[0].showid;

    const t = await client.query(
      `INSERT INTO Ticket (fk_showID, fk_userID)
      VALUES ($1, $2)
      RETURNING TicketID`,
      [showId, userId]
    )
    
    await client.query("COMMIT");
    return res.status(201).json({
      roomId, 
      showId, 
      ticketId: t.rows[0].ticketid})
  }catch(e){
    await client.query("ROLLBACK");
    return res.status(500).json({ message: e.message || 'Insert cart failed'})
  }finally{
    client.release();
  }
})

app.get("/api/cart", requireAuth, async (req, res) => {

  const userId = req.user.sub;

  try{
    const r = await pool.query(
      `
      SELECT * FROM Ticket
      INNER JOIN Show s ON Ticket.fk_showID = s.ShowID
      INNER JOIN AppUser ON Ticket.fk_userID = AppUser.UserID
      INNER JOIN Movie ON s.fk_movie_id = Movie.MovieID
      INNER JOIN Room ON s.fk_room_id = Room.RoomID
      WHERE AppUser.UserID = $1
      `,
      [userId]
    );
    res.status(200).json(r.rows)
  }catch(e){
    res.status(500).json({ message: "get cart failed"})
  }

})

app.delete('/api/cart/:ticketId', async (req, res) => {
  const ticketId = Number(req.params.ticketId)
  if(!ticketId) return res.status(400).json({ message: 'missing Data'});

  try{
    const r = await pool.query(
      `
        DELETE FROM Ticket t
        WHERE t.ticketid = $1
      `,
      [ticketId]
    )
    res.sendStatus(200);
  }catch(e){
    res.status(500).json({message: "Ticket delete failed"})
  }
})

// listen
app.listen(process.env.PORT, () => console.log("API ON", process.env.PORT));