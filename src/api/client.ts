const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
    token?: string | null,
): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> | undefined),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message = data?.error?.message || data?.error || data?.message || res.statusText;
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }

    return data as T;
}
