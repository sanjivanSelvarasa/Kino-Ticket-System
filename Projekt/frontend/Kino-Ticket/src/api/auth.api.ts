const base = import.meta.env.VITE_API_BASE;

export async function registerApi(username: string, email: string, password: string) {
    const r = await fetch(`${base}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    if(!r.ok) {
        const error = await r.text();
        throw new Error(error || "Register failed");
    }

    return await r.json();
}