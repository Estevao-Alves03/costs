import React from "react"
import styles from "..//project/ProjectCard.module.css"
import {BsFillTrashFill} from "react-icons/bs"


function ServiceCard({id, name, cost, description, handleRemove}) {

    function remove(e){
        e.preventDefault()
        handleRemove(id, cost)
    }


    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <span>Custo total:</span> R$:{cost}
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

 export default ServiceCard