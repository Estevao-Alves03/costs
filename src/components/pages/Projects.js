import React from "react";
import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css"
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/loading";
import Container from "../layout/Container"
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";


function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation();
    let message = '';
    if (location.state && location.state.message) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then((resp) => resp.json())
            .then((data) =>{
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            }) 
            .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers: {
                'Content-type' : 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((projects) => projects.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    console.log('Mensagem recebida:', message);

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container costumClass="start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 &&(
                        <p>não a projetos cadastrados no momento.</p>
                    )}
            </Container>
        </div>   
    );
}

export default Projects;
