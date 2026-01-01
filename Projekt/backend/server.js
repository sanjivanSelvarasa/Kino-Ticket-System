import express from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT, () => console.log("API ON", process.env.PORT));


