import {useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types";
import { AuthContext } from "../hooks/useAuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
    const {login: apiLogin, guestLogin: apiGuestLogin, register: apiRegister} = useAuth()
    const [user, setUser] = useState<User>({token: "", username: "", role:""})
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isRegisterType, setIsRegisterType] = useState(false)

    const login = async (email: string, password: string) => {
        setError(null)
        try {
            const data = await apiLogin(email, password);
            if (!data) return
            setUser({token: data.token, username: data.user.username, role: data.user.role})
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.user.username)
            console.log("role", user.role)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const resetError = () => {
        setError(null)
    }

    const setCustomError = (message: string) => {
        setError(message)
    }

    const guestLogin = async() => {
        setError(null)
        try {
            const data = await apiGuestLogin();
            if (!data) {
                console.log(error)
                return
            }
            setUser({token: data.token, username: data.user.username, role: data.user.role})
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.user.username)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const register = async(email: string, username: string, password: string) => {
        setError(null)
        try {
            console.log("auth context", "email", email, "username", username, "password", password)
            const data = await apiRegister(email, username, password)
            if (!data) if (!data) {
                console.log(error)
                return
            }
            //setup email validation
            setUser({token: data.token, username: data.user.username, role: data.user.role})
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.user.username)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const logout = () => {
        setError(null)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setUser({token: "", username: "", role: ""})
    }

    useEffect(() => {
        if (user.token === "")
            setIsAuth(false)
        if (user.token != "")
            setIsAuth(true)
    }, [user])

    return <AuthContext.Provider value={{login, guestLogin, register, logout, user, isAuth, error, resetError, setCustomError, isRegisterType, setIsRegisterType}} >
        {children}
    </AuthContext.Provider>
}
