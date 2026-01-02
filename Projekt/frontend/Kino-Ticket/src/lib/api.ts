import { useAuthStore } from "../stores/auth";

let refreshing: Promise<boolean> | null = null;

export async function refreshAccessToken(): Promise<boolean> {
    if (refreshing) return refreshing;

    refreshing = (async () => {
        const auth = useAuthStore();
        const r = await fetch("http://localhost:4000/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!r.ok) {
            auth.accessToken = null;
            auth.user = null;
            localStorage.removeItem("accessToken");
            return false;
        }

        const data = await r.json();
        auth.accessToken = data.accessToken;
        localStorage.setItem("accessToken", auth.accessToken!);
        return true;
    })();

    const result = await refreshing;
    refreshing = null;
    return result;
}

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
    const auth = useAuthStore();

    const headers = new Headers(init.headers);
    if (auth.accessToken) headers.set("Authorization", `Bearer ${auth.accessToken}`);

    let r = await fetch(input, { ...init, headers, credentials: "include" });

    if (r.status === 401) {
        const ok = await refreshAccessToken();
        if (!ok) return r;

        const headers2 = new Headers(init.headers);
        headers2.set("Authorization", `Bearer ${useAuthStore().accessToken}`);
        r = await fetch(input, { ...init, headers: headers2, credentials: "include" });
    }

    return r;
}