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


}