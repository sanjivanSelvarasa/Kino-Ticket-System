import {http} from "./http.ts";
const base = import.meta.env.VITE_API_BASE;

export const showApi = {
    async getAllShows() : Promise<any> {
        return http<any>(`${base}/show`);
    },
    async createShow(movieId: number, roomId: number, startTime: string, price: number): Promise<any> {
        const r = await fetch(`${base}/show`, {
            method: "POST",
            body: JSON.stringify({
                movieId: movieId,
                roomId: roomId,
                startTime: startTime,
                price: price,
            }),
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })

        if (!r.ok) {
            throw new Error(await r.text() || "show failed");
        }

        return await r.json();
    }
}