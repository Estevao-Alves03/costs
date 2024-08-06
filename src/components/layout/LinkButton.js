import { Link } from "react-router-dom"
import Styles from "./LinkButton.module.css"
import React from "react"

function LinkButton({to, text}){
    return(
        <Link className={Styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default LinkButton