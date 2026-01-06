import {http} from "./http.ts";

const base = import.meta.env.VITE_API_BASE;

export const roomsApi = {
    async getAllRooms() : Promise<any>{
        return http<any>("/room");
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
    }
}
