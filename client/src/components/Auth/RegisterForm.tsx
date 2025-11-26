import React from "react";
import { useState } from "react";
import FormInput from "../FormInput";
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/LoginFormStyle.css"
import { isValidEmail } from "../../helpers/isValidEmail";
import { isValidPassword } from "../../helpers/isValidPassword";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const {loading} = useAuth();
    const {register, error, setCustomError} = useAuthContext()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmPassword != password) {
            setCustomError("Les mots de passe ne sont pas identiques")
            return
        }
        if (!isValidEmail(email)){
            setCustomError("L'adresse mail est incorrecte")
            return
        }
        if (!isValidPassword(password)) {
            setCustomError("Le mot de passe est invalide")
        }
        console.log("register form", "email", email, "username", username, "password", password)
        register(email, username, password)
    }

    return <div>
        <form onSubmit={handleSubmit} className="global-container" >
            <FormInput title="Email" value={email} setValue={setEmail} error={!!error} type="email" />
            <FormInput title="Nom d'utilisateur" value={username} setValue={setUsername} error={!!error} type="text" />
            <FormInput title="Mot de passe" value={password} setValue={setPassword} error={!!error} type="password" />
            <FormInput title="Confirmez le mot de passe" value={confirmPassword} setValue={setConfirmPassword} error={!!error} type="password" />
            <p className="errorT" >{error}</p>
            <button disabled={loading} type="submit">
                {loading ?  "Connexion...": "S'inscrire"}
            </button>
        </form>
    </div>
}

export default RegisterForm