import Styles from "./Home.module.css"
import savings from "../../img/savings.svg"
import LinkButton from "../layout/LinkButton"
import React from "react"

function Home() {
    return(
        <section className={Styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home