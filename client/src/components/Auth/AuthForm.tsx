import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/AuthFormStyle.css"

const AuthForm: React.FC = () => {
    const {resetError, isRegisterType, setIsRegisterType} = useAuthContext()

    const handleClickRegister = (id: number) => {
        if (id == 1 && !isRegisterType || id == 2 && isRegisterType) {
            setIsRegisterType(!isRegisterType)
            resetError()
        }
    }

    return <div className="container" >
        <div className="tabs" >
            <div onClick={() => handleClickRegister(1)} className={`tab ${isRegisterType ? "active" : ""}`} ><p>Inscription</p></div>
            <div onClick={() => handleClickRegister(2)} className={`tab ${!isRegisterType ? "active" : ""}`}><p>Connexion</p></div>
        </div>
        <div className="spacer" ></div>
        <div className="input-section" >
            {!isRegisterType && <LoginForm/>}
            {isRegisterType && <RegisterForm/>}
        </div>
        <div className="spacer" ></div>
    </div>
}

export default AuthForm