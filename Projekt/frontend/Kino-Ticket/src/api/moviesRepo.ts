import {http} from "./http.ts";
import type { Movie } from "../types/movie";
import { searchMovies} from "./tmdb.api.ts";

export const moviesRepo = {

    getAllMovies(): Promise<Movie[]> {
        return http<Movie[]>('/movie?order=title.asc')
            .then(rows => {
                    const mapped = rows.map(async r => ({
                        ...r,
                        releasedate: new Date(r.releasedate),
                        poster_path: `https://image.tmdb.org/t/p/w500${await searchMovies(r.title)}`,
                    }))
                return Promise.all(mapped);
            });
    },
    getById(id: number): Promise<Movie> {
        return http<Movie[]>(`/movie?movieid=eq.${id}`)
            .then(async rows => {
                if (rows.length === 0) {
                    throw new Error(`No movie with id ${id}`);
                }

                const r = rows[0];
                return {
                    ...r,
                    releasedate: new Date(r.releasedate),
                    poster_path: `https://image.tmdb.org/t/p/w500${await searchMovies(r.title)}`,
                };
            });
    }


}