import Styles from "./Input.module.css"
import React from "react"

function Input({ type, text, name, placeholder, handleOnChange, value}){
    return(
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            id={name} 
            onChange={handleOnChange} 
            value={value}
            />
        </div>
    )
}

export default Input