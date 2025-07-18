import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeartbeat, faHospital, faUserMd, faUserInjured } from '@fortawesome/free-solid-svg-icons'
import { faGithub as faGithubBrand, faLinkedin as faLinkedinBrand } from '@fortawesome/free-brands-svg-icons'
import { participantes } from './participantes'
//import { inicializarPacientesAleatorios } from "../../utils/dados"

import './Home.css'


export function Home() {
    const noticias = [
        { data: "02/07/2025", texto: "Novo layout responsivo para triagem e atendimento implementado!" },
        { data: "30/06/2025", texto: "Painel de situação agora atualiza em tempo real." },
        { data: "28/06/2025", texto: "Cadastro de pacientes com validação aprimorada." },
        { data: "25/06/2025", texto: "Projeto inicial publicado no GitHub." },
    ]

    const [noticiaAtual, setNoticiaAtual] = useState(0);

    useEffect(() => {
        //inicializarPacientesAleatorios()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setNoticiaAtual((prev) => (prev + 1) % noticias.length)
        }, 4000);

        return () => clearInterval(timer)
    }, [noticias.length])

    function handleNoticiaClick(idx) {
        setNoticiaAtual(idx)
    }

    return (
        <>
            <main className="home">
                <span className="home-icons">
                    <FontAwesomeIcon icon={faHospital} className="icon-hospital" title="Hospital" />
                    <FontAwesomeIcon icon={faUserMd} className="icon-doctor" title="Médico" />
                    <FontAwesomeIcon icon={faUserInjured} className="icon-patient" title="Paciente" />
                    <FontAwesomeIcon icon={faHeartbeat} className="icon-heart" title="Cuidado" />
                </span>

                <h1>Projeto de Gestão de Fluxo Hospitalar</h1>

                <section className="home-resumo">
                    <p><b>Resumo:</b> Sistema web para cadastro, triagem, atendimento médico e painel de situação dos pacientes, com atualização em tempo real e interface responsiva.</p>
                </section>

                <section className="home-noticias">
                    <b>Notícias:</b>

                    <article className="noticia-destaque" onClick={() => window.open('https://github.com/', '_blank')} style={{ cursor: 'pointer' }}>
                        <span className="noticia-data">{noticias[noticiaAtual].data}:</span> {noticias[noticiaAtual].texto}
                    </article>

                    <span className="noticia-indicadores">
                        {noticias.map((n, idx) => (
                            <button
                                key={idx}
                                className={"noticia-indicador" + (idx === noticiaAtual ? " ativo" : "")}
                                onClick={() => handleNoticiaClick(idx)}
                                aria-label={`Ver notícia de ${n.data}`}
                            >
                           
                            </button>
                        ))}
                    </span>
                </section>

                <section className="home-participantes">
                    <b>Participantes:</b>

                    <ul>
                        {participantes.map((p, idx) => (
                            <li key={idx}>
                                {p.nome}
                                
                                <a href={p.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FontAwesomeIcon icon={faGithubBrand} className="icon-link" /></a>

                                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FontAwesomeIcon icon={faLinkedinBrand} className="icon-link" /></a>
                            </li>
                        ))}
                    </ul>
                </section>

                <p className="home-versao">Versão 2.0 REFATORADO</p>

                <p>Selecione um módulo acima para iniciar o atendimento ao paciente.</p>
            </main>
        </>
    )
}