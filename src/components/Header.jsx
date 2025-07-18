import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './Header.css';


export default function Header() {
    return (
        <header className="header">
            <h1>
                <FontAwesomeIcon icon={faHeart} className="gentle-pulse header-icon" />
                Avanti + Saúde
            </h1>

            <hr />

            <Nav />
        </header>
    )
}