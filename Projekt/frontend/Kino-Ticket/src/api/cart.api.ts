import {useAuthStore} from "../stores/auth.ts";
import {http} from "./http.ts";

const base = import.meta.env.VITE_API_BASE;

export const cartApi = {
    async createCart(movieId: number, roomName: string, startTime: string, price: number) : Promise<any> {
        const auth = useAuthStore();

        const r = await fetch(`${base}/cart`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}), },
            body: JSON.stringify({
                movieId: movieId,
                roomName: roomName,
                startTime: startTime,
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

    // async deleteCart(movieId: number, roomName: string, startTime: string, price: number) : Promise<any> {},
    //
    // async updateCart(movieId: number, roomName: string, startTime: string, price: number) : Promise<any> {},

    async getCart() : Promise<any> {
        const auth = useAuthStore();
        return http<any>("/cart", {
            method: "GET",
            headers: {
                ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
            }
        });
    }
}