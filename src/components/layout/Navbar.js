import { Link } from "react-router-dom"
import Container from "./Container"
import Styles from "./Navbar.module.css"
import logo from "../../img/costs_logo.png"
import React from "react"

function Navbar(){
    return(
        <nav className={Styles.navbar}>
            <Container>
                <Link to="/"> <img src={logo} alt="costs" /></Link>
                <ul className={Styles.list}>
                    <li className={Styles.item}>
                    <Link to="/">Home</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link to="/projects">Projects</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link to="/company">Company</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link to="/contact">Contact</Link>
                    </li>
                </ul>   
            </Container>
        </nav>
    )
}

export default Navbar