import { defineStore } from "pinia";
import { apiFetch, refreshAccessToken } from "../lib/api";

type User = { id: string; email: string; role?: string };

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: localStorage.getItem("accessToken") as string | null,
        user: null as User | null,
    }),
    getters: {
        isLoggedIn: (s) => !!s.accessToken,
    },
    actions: {
        async login(email: string, password: string) {
            const r = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (!r.ok) throw new Error("Login fehlgeschlagen");
            const data = await r.json();

            this.accessToken = data.accessToken;
            this.user = data.user;
            localStorage.setItem("accessToken", this.accessToken!);
        },

        async logout() {
            await fetch("http://localhost:4000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            }).catch(() => {});
            this.accessToken = null;
            this.user = null;
            localStorage.removeItem("accessToken");
        },

        async loadMe() {
            // user nach reload wieder holen
            const r = await apiFetch("http://localhost:4000/api/me");
            if (r.ok) {
                const data = await r.json();
                this.user = { id: data.user.sub, email: data.user.email, role: data.user.role };
            }
        },

        async ensureFreshToken() {
            if (!this.accessToken) return false;
            // Request 401, refreshen auf apiFetch auto.
            const ok = await refreshAccessToken();
            return ok;
        },
    },
});
