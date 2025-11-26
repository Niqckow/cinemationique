import React from "react";
import { useState } from "react";
import FormInput from "../FormInput";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/LoginFormStyle.css"
import { isValidEmail } from "../../helpers/isValidEmail";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, setCustomError, guestLogin} = useAuthContext()

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!isValidEmail(email)){
                setCustomError("L'adresse mail est incorrecte")
                return
            }
            console.log("login button clicked")
            login(email, password)
        }

    const handleGuestLogin = () => {
        console.log("guest login button clicked")
        try {
            guestLogin();
        } catch (err) {
            console.error("Erreur lors de la connexion en tant qu'invité :", err);
        }
    };

    return <form onSubmit={handleSubmit} className="global-container" >
        <FormInput title="Email" value={email} setValue={setEmail} error={!!error} type="email"/>
        <FormInput title="Mot de passe" value={password} setValue={setPassword} error={!!error} type="password"/>
        <p className="errorT" >{error}</p>
        <button onClick={handleGuestLogin} >Se connecter en tant qu'invité</button>
        <button type="submit" >Se connecter</button>
    </form>
}

export default LoginForm