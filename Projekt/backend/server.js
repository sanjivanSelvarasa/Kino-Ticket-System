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
    const r = await fetch(`${PGRST}/movie?select=*`);
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


