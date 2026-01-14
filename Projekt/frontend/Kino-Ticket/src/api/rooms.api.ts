import {http} from "./http.ts";

const base = import.meta.env.VITE_API_BASE;

export const roomsApi = {
    async getAllRooms() : Promise<any>{
        return http<any>("/rooms");
    },
    async getRoomById(movieId: string, date: Date, time: string): Promise<any> {
        const day = date.toISOString().slice(0, 10);
        const qs = new URLSearchParams({
            movieId: String(movieId),
            date: day,
            time: time,
        });

        const r = await fetch(`${base}/room?${qs}`, {
            method: "GET",
            credentials: "include",
        });

        if(!r.ok) {
            throw new Error(await r.text() || "room failed");
        }

        return await r.json();
    },
    async createRoom(name: string): Promise<any> {
        const r = await fetch(`${base}/room`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
            }),
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })

        if (!r.ok) {
            throw new Error(await r.text() || "room failed");
        }

        return await r.json();
    },
}
