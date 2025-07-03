import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import './header.css';


export default function Header() {
  return (
    <header className="header">
        <h1>
          <FontAwesomeIcon icon={faHeartbeat} className="header-icon" />
          Avanti + Saúde
        </h1>
        <hr />
        <Nav />
    </header>
  );
}