import React from "react"
import styles from "./Contact.module.css"
import {FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa'

function Contact() {
    return(
        <div className={styles.container}>
            <h2>Entre em contato com um dos nossos programadores : </h2>
            <div>
                <p><FaFacebook /> ProgramadorCosts</p>
                <p><FaWhatsapp /> (62) 912345678</p>
                <p><FaInstagram /> ProgramadndoComReact</p>
                <p> <FaLinkedin /> ProgramadorCosts.com</p>
            </div>
        </div>
    )
}

export default Contact