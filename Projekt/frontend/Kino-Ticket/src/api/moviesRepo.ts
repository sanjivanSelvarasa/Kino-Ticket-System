import {http} from "./http.ts";
import type { Movie } from "../types/movie";

export const moviesRepo = {

    getAllMovies(): Promise<Movie[]> {
        return http<Movie[]>('/movie?order=title.asc')
            .then(rows =>
                rows.map(r => ({
                    ...r,
                    releasedate: new Date(r.releasedate),
                }))
            );
    },
    getById(id: number): Promise<Movie> {
        return http<Movie[]>(`/movie?movieid=eq.${id}&limit=1`)
            .then(rows => {
                if (rows.length === 0) {
                    throw new Error(`No movie with id ${id}`);
                }

                const r = rows[0];
                return {
                    ...r,
                    releasedate: new Date(r.releasedate),
                };
            });
    }


}