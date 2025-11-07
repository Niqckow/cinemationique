import type { User } from "../types";
import { createContext, useContext } from "react";

export interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    guestLogin: () => Promise<void>;
    register: (email: string, username: string, password: string) => Promise<void>
    logout: () => void
    user: User
    isAuth: boolean
    error: string | null
    resetError: () => void
    setCustomError: (message: string) => void
    isRegisterType: boolean,
    setIsRegisterType: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used within an AuthProvider");
    return ctx;
}