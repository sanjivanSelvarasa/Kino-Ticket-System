import {useAuthStore} from "../stores/auth.ts";
import {apiFetch} from "../lib/api.ts";

const base = import.meta.env.VITE_API_BASE;

export const cartApi = {
    async createCart(movieId: number, roomName: string, startTime: string, date: Date, price: number) : Promise<any> {
        const auth = useAuthStore();

        const r = await fetch(`${base}/cart`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}), },
            body: JSON.stringify({
                movieId: movieId,
                roomName: roomName,
                startTime: startTime,
                date: date,
                price: price,
            }),
            credentials: "include",
        })

        if(!r.ok) {
            const text = await r.text();
            throw new Error(text || `HTTP ${r.status}`);
        }

        return await r.json();
    },

    async updateCart(ticketId: string) : Promise<any> {
        const r = await apiFetch(`${base}/cart`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ticketId: ticketId,
            })
        });

        if(!r.ok) {
            throw new Error(await r.text());
        }

        return await r.json();
    },

    async getCart() : Promise<any> {
        const r = await apiFetch(`${base}/cart`, {
            method: "GET",
        });

        if(!r.ok) {
            throw new Error(await r.text());
        }

        return await r.json()
    },

    async deleteCart(ticketid: string) : Promise<any> {
        const r = await apiFetch(`${base}/cart/${ticketid}`, {
            method: "DELETE",
        })

        if(!r.ok) {
            throw new Error(await r.text());
        }

        return r.status === 204 ? null : await r.json();
    }
}