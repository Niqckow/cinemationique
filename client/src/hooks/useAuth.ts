import axios from "axios";
import {useState } from "react";
import getAuthRoute from "../helpers/getRoutes";


interface User {
    id: string,
    username: string,
    role: string,
}

interface AuthResponse {
    user: User,
    token: string
}

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const API_URL = getAuthRoute()

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        setLoading(true);
        try {
            const res = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
            return res.data
        } catch (err) {
            let message = "Une erreur est survenue."
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message
            } else if (err instanceof Error) {
                message = err.message;
            }
            throw new Error(message)
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, username: string, password: string): Promise<AuthResponse> => {
        setLoading(true);
        try {
            console.log("useAuth", "email", email, "username", username, "password", password)
            const res = await axios.post<AuthResponse>(`${API_URL}/register`, {
                password,
                username,
                email,
            });
            return res.data
        } catch (err) {
            let message = "Erreur lors de l'inscription."
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message
            } else if (err instanceof Error) {
                message = err.message;
            }
            throw new Error(message)
        } finally {
            setLoading(false);
        }
    };
    const guestLogin = async (): Promise<AuthResponse | null> => {
        setLoading(true);
        try {
            const res = await axios.post<AuthResponse>(`${API_URL}/guest`);
            return res.data
        } catch (err) {
            let message = "Impossible de se connecter en invité."
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message
            } else if (err instanceof Error) {
                message = err.message;
            }
            throw new Error(message)
        } finally {
            setLoading(false);
        }
    };

    return {
    loading,
    login,
    register,
    guestLogin,
  };
}