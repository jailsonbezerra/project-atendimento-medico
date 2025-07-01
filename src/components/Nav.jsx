import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faNotesMedical, faUserMd, faHome } from "@fortawesome/free-solid-svg-icons";

import './nav.css';


export default function Nav() {
  return (
    <nav className="menu-navegacao">
        <Link to='/'><FontAwesomeIcon icon={faHome} />Home</Link>
        <Link to='/cadastro'><FontAwesomeIcon icon={faUserPlus} />Cadastro</Link>
        <Link to='/triagem'><FontAwesomeIcon icon={faNotesMedical} /> Triagem</Link>
        <Link to='/atendimento'><FontAwesomeIcon icon={faUserMd} /> Atendimento</Link>
    </nav>
  )
}