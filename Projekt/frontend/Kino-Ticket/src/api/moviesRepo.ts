import {http} from "./http.ts";
import type { Movie } from "../types/movie";
import {searchMovies, searchTrailers} from "./tmdb.api.ts";

export const moviesRepo = {

    getAllMovies(): Promise<Movie[]> {
        return http<Movie[]>("/movie").then(async (rows) => {
            const mapped = rows.map(async (r) => {
                const tmdb = await searchMovies(r.title);

                return {
                    ...r,
                    releasedate: new Date(r.releasedate),
                    poster_path: tmdb?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : null,
                    trailer: tmdb.id ? await searchTrailers(tmdb.id) : null,
                };
            });

            return Promise.all(mapped);
        });
    },

    getById(id: number): Promise<Movie> {
        return http<Movie[]>(`/movie/${id}`)
            .then(async rows => {
                if (rows.length === 0) {
                    throw new Error(`No movie with id ${id}`);
                }

                const r = rows[0];
                const tmdb = await searchMovies(r.title);
                return {
                    ...r,
                    releasedate: new Date(r.releasedate),
                    poster_path: tmdb?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : null,
                    trailer: tmdb.id ? await searchTrailers(tmdb.id) : null,
                };
            });
    }


}