const base = import.meta.env.VITE_API_BASE;

export async function searchMovies(query: string) {
    const r = await fetch(`${base}/tmdb/search?q=${encodeURIComponent(query)}`);
    if (!r.ok) return new Error(await r.text());
    const data = await r.json();
    return data.results?.[0]?.poster_path ?? null;
}