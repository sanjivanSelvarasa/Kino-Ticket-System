import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5174", // Frontend-Origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const TMDB_Token = process.env.TMDB_Token;
const PGRST = process.env.PGRST_URL;

// DB durchgeben
app.get("/api/movie", async (req, res) => {
  const qs = new URLSearchParams(req.query).toString();
  const url = `${PGRST}/movie?select=*${qs ? "&" + qs : ""}`;

  console.log("Proxy ->", url); // wichtig zum Debuggen
  const r = await fetch(url);

  res.status(r.status).send(await r.text());
});


app.get("/api/movie/:id", async (req, res) => {
  const id = Number(req.params.id);
  const r = await fetch(`${PGRST}/movie?movieid=eq.${id}&limit=1&select=*`);
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


// Test User
const users = [
  { id: "u1", email: "test@test.ch", passwordHash: bcrypt.hashSync("test1234", 10), role: "user"}
];

// Refresh Token Store
const refreshStore = new Map();

function signAccessToken(user){
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES || "10m" }
  );
}

function signRefreshToken(user){
  return jwt.sign(
    {sub: user.id },
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
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password ?? "", user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  refreshStore.set(user.id, refreshToken);
  setRefreshCookie(res, refreshToken);

  res.json({
    accessToken,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

// Refresh
app.post("/api/auth/refresh", (req, res) => {
  const rt = req.cookies.refresh_token;
  if (!rt) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
    const userId = payload.sub;
    const stored = refreshStore.get(userId);
    if (stored !== rt) return res.status(401).json({ message: "Refresh token revoked" });

    const user = users.find((u) => u.id === userId);
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

app.listen(process.env.PORT, () => console.log("API ON", process.env.PORT));