import React, { useState, type SetStateAction } from "react";
import "../styles/FormInputStyle.css"

interface FormInputProps {
    title: string,
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>,
    error: boolean,
    type: string
}

const FormInput: React.FC<FormInputProps> = ({setValue, title, value, error, type}) => {
    
    const isPassword = type === "password"
    const [isVisible, setVisible] = useState(false)

    return (<div className="box-container" >
        <p className="title" >{title}</p>
        <div  className={`box-input ${error ? "error" : ""}`} >
            <input type={isVisible && isPassword ? "text":  type} className={`final-input${isPassword ? "-password" : ""}`}  onChange={(e) => setValue(e.target.value)} value={value} ></input>
            {isPassword && <div className="fip-container" >
                <div className={`final-input-password-button ${isVisible ? "active" : ""}`} onClick={() => {setVisible(!isVisible)}} ></div>
                </div>}
        </div>
    </div>)
}

export default FormInput