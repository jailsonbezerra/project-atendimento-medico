import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './home.css';


export function Home() {
  return (
    <>
      <main className="home">
          <FontAwesomeIcon icon={faHeart} className="gentle-pulse" />

          <p>Selecione um módulo acima para iniciar o atendimento ao paciente.</p>
          <p>Sistema de gestão de fluxo hospitalar - Versão 1.0</p>
      </main>
    </>
  )
}