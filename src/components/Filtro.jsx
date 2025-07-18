import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faHeartbeat, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import './Filtro.css'


export default function Filtro({ onFiltro, titulo, filtroSelecionado }) {
    const isAtivo = filtro => filtroSelecionado === filtro

    return (
        <nav className="filtro">
            <h1>{titulo}</h1>

            <ul>
                <li><button onClick={() => onFiltro(null)} className={!filtroSelecionado ? 'ativo' : ''}>Todos</button></li>

                <li><button onClick={() => onFiltro('Urgente')} className={`urgente ${isAtivo('Urgente') ? 'ativo' : ''}`}><FontAwesomeIcon icon={faExclamationCircle} />Urgente</button></li>

                <li><button onClick={() => onFiltro('Moderado')} className={`moderado ${isAtivo('Moderado') ? 'ativo' : ''}`}><FontAwesomeIcon icon={faHeartbeat} />Moderado</button></li>
                
                <li><button onClick={() => onFiltro('Normal')} className={`normal ${isAtivo('Normal') ? 'ativo' : ''}`}><FontAwesomeIcon icon={faCheckCircle} />Normal</button></li>
            </ul>
        </nav>
    )
}