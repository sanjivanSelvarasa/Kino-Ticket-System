export type Movie = {
    movieid: number;
    title: string;
    image: string | null;
    awards: string | null;
    rating: number;
    releasedate: Date;
    length: number;
    agerating: number;
    genre: string;
    description: string;
    poster_path: string | null;
    programtime: { time: string}[];
};
