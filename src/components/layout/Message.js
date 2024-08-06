import styles from "./Message.module.css"
import React from "react"
import { useState, useEffect } from "react"

function Message({type, msg}){

    const [visible, setVisible] = useState(false)

    useEffect(() => {

    // se nao ouver nenhuma msg, nao mostra nada
    if(!msg){
        setVisible(false)
        return
    }

    // senao, se houver msg, mostre
    setVisible(true)

    // timer para sumir com a mensagem assim que for verdadeira(inicio o timer)
    const timer = setTimeout(() =>{
        setVisible(false)
    }, 3000)

    // finalizo o timer
    return () => clearTimeout(timer)
    }, [msg])
    

    return(
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
}

export default Message