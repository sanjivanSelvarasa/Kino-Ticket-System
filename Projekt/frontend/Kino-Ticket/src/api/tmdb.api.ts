const base = import.meta.env.VITE_API_BASE;

export async function searchMovies(query: string) : Promise<{ id:number | null; poster_path: string | null}> {
    const r = await fetch(`${base}/tmdb/search?q=${encodeURIComponent(query)}`);
    if (!r.ok) throw new Error(await r.text());
    const data = await r.json();
    const m = data.results?.[0] ?? null;
    return {
        id: m?.id ?? null,
        poster_path: m?.poster_path ?? null,
    };
}

export async function searchTrailers(movieId: string | number) : Promise<string | null | Error> {
    const r = await fetch(`${base}/movies/${movieId}/trailer`);
    if(!r.ok) return new Error(await r.text());

    const trailer = await r.json();

    return (trailer) ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}