import { parse, v4 as uuidv4} from 'uuid'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './Project.module.css'; 
import Loading from "../layout/loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState(null); 
  const [services, setServices] = useState([]); 
  const [ShowProjectForm, setShowProjectform] = useState(false)
  const [ShowServiceForm, setShowServiceform] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(resp => resp.json())
                .then((data) => {
                  setProject(data);
                  setServices(data.services)
                })
                .catch(err => console.log(err));
        }, 300);
  }, [id]);

  function editPost(project){
    setMessage('')
    // budget validation 
    if(project.budget < project.cost){
        setMessage('o orçamento nao pode ser menor que o custo do projeto!')
        setType('error')
        return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(project),
    }).then(resp => resp.json())
    .then(data => {
        setProject(data)
        setShowProjectform(false)
        setMessage('projeto atualizado')
        setType('success')
    })
    .catch(err => console.log(err))

  }

  function createService(project){
    setMessage('')
    // last service
    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if(newCost > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado, verifique o valor do serviço')
        setType('error')
        project.services.pop()
        return false
    }

    // add service cost to project total cost
    project.cost = newCost

    // uptade project 
    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }).then((resp) => resp.json())
    .then((data) => {
        setShowServiceform(false)
    })
    .catch((err) => console.log(err))
  }

  function removeService(id, cost){

    const servicesUpdate = project.services.filter(
        (service) => service.id !== id
    )

    const projectUpdate = project
    projectUpdate.services = servicesUpdate
    projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectUpdate)
    }).then((resp) => resp.json())
    .then((data) =>{
      setProject(projectUpdate)
      setServices(servicesUpdate)
      setMessage('Serviço removido com sucesso!')
      setType('success')
    })
    .catch((err) => console.log(err))

  }

  
  function toggleProjectForm(){
    setShowProjectform(!ShowProjectForm)
  }
  
  function toggleServiceForm(){
    setShowServiceform(!ShowServiceForm)
  }
  
  return (
    <>
      {project ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!ShowProjectForm ? "editar projeto" : "fechar"}
                    </button>
                    {!ShowProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total do Orçamento: </span> R$:{project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span> R$:{project.cost}
                            </p>
                        </div>
                    ) : (
                        <div  className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btntext="concluir ediçao" projectData={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço :</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!ShowServiceForm ? "adicionar serviço" : "fechar"}
                    </button>
                    <div className={styles.project_info}>
                        {ShowServiceForm && <ServiceForm 
                            handleSubmit={createService}
                            btntext="adicionar serviço"
                            projectData={project}
                        />}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.length > 0 &&
                        services.map((services) => (
                            <ServiceCard 
                                id={services.id}
                                name={services.name}
                                cost={services.cost}
                                description={services.description}
                                key={services.id}
                                handleRemove={removeService}
                            />
                        ))
                    }
                    {services.length === 0 && <p>Nao há serviços cadastrados.</p>}
                </Container>
            </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
