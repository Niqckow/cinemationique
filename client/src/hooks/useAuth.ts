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
        } catch (err: any) {
            const message = err.response?.data?.message
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
        } catch (err: any) {
            const message = err.response?.data?.message || "Erreur d'inscription";
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
        } catch (err: any) {
            const message = err.response?.data?.message ||"Impossible de se connecter en invité";
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