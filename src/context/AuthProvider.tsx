import { useMemo, useState, type ReactNode } from "react";
import type { User } from "../types";
import { login as apiLogin } from "../api/auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem("user");
        return raw ? (JSON.parse(raw) as User) : null;
    });

    async function login(username: string, password: string) {
        const data = await apiLogin(username, password);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    const value = useMemo(() => ({ token, user, login, logout }), [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
