import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHospital, faUserMd, faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand, faLinkedin as faLinkedinBrand } from '@fortawesome/free-brands-svg-icons';

import './home.css';
import { participantes } from './participantes';

export function Home() {
  return (
    <>
      <main className="home">
        <div className="home-icons">
          <FontAwesomeIcon icon={faHospital} className="icon-hospital" title="Hospital" />
          <FontAwesomeIcon icon={faUserMd} className="icon-doctor" title="Médico" />
          <FontAwesomeIcon icon={faUserInjured} className="icon-patient" title="Paciente" />
          <FontAwesomeIcon icon={faHeart} className="gentle-pulse icon-heart" title="Cuidado" />
        </div>
        <h1>Projeto de Gestão de Fluxo Hospitalar</h1>
        <div className="home-resumo">
          <p><b>Resumo:</b> Sistema web para cadastro, triagem, atendimento médico e painel de situação dos pacientes, com atualização em tempo real e interface responsiva.</p>
        </div>
        <div className="home-participantes">
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
        </div>
        <p className="home-versao">Versão 1.0</p>
        <p>Selecione um módulo acima para iniciar o atendimento ao paciente.</p>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Projeto Hospitalar | Desenvolvido para fins acadêmicos</span>
      </footer>
    </>
  )
}