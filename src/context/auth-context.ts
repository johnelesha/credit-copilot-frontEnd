import { createContext } from "react";
import type { User } from "../types";

export interface AuthState {
    token: string | null;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthState | null>(null);
