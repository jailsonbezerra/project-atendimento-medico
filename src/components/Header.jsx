import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';

import './header.css';


export default function Header() {
  return (
    <header>
        <h1><FontAwesomeIcon icon={faHospital} />Fluxo de Atendimento Médico</h1>

        <hr />
        
        <Nav />
    </header>
  );
}