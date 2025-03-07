import Styles from "./SubmitButton.module.css"
import React from "react"

function SubmitButton({text}){
    return(
        <div>
            <button className={Styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton