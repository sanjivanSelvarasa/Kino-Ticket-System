const base = import.meta.env.VITE_API_BASE;

export async function http<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${base}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        },
        ...options,
    });

    if(!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    if(res.status === 204) {
        return undefined as T;
    }

    return await res.json();
}