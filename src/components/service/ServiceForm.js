import styles from '..//project/ProjectForm.module.css'
import React from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import { useState } from 'react'

function ServiceForm({handleSubmit, btntext, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        if (!projectData.services) {
            projectData.services = [];
        }
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    
    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
           <Input 
             type="text"
             text="Nome do serviço"
             name="name"
             placeholder="insira o nome do serviço"
             handleOnChange={handleChange}
           />
           <Input 
             type="number"
             text="custo do serviço"
             name="cost"
             placeholder="insira o valor total"
             handleOnChange={handleChange}
           />
           <Input 
             type="text"
             text="descriçao do serviço"
             name="description"
             placeholder="descreva o servico"
             handleOnChange={handleChange}
           />
           <SubmitButton text={btntext} />
        </form>
    )
}

export default ServiceForm