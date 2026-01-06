import {http} from "./http.ts";
const base = import.meta.env.VITE_API_BASE;

export const ticketApi = {
    async getAllTickets(){
        return http<any>("/ticket");
    },
    async createTicket(showId: number, userId: number){
        const r = await fetch(`${base}/ticket`, {
            method: "POST",
            body: JSON.stringify({
                showId: showId,
                userId: userId,
            }),
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })

        if(!r.ok) return new Error(await r.text() || "Ticket failed");

        return await r.json();
    }
}