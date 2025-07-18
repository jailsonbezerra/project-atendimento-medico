import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faHeartbeat, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import './Prioridade.css'


export default function Prioridade({ prioridade, onChange }) {
    function isAtivo(valor) {
        return prioridade === valor;
    }

    return (
        <ul className="selecao-prioridade">
            <li>
                <button
                    type="button"
                    onClick={() => onChange('Urgente')}
                    className={`urgente ${isAtivo('Urgente') ? 'ativo' : ''}`}
                >
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    Urgente
                </button>
            </li>

            <li>
                <button
                    type="button"
                    onClick={() => onChange('Moderado')}
                    className={`moderado ${isAtivo('Moderado') ? 'ativo' : ''}`}
                >
                    <FontAwesomeIcon icon={faHeartbeat} />
                    Moderado
                </button>
            </li>

            <li>
                <button type="button" onClick={() => onChange('Normal')} className={`normal ${isAtivo('Normal') ? 'ativo' : ''}`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Normal
                </button>
            </li>
        </ul>
    )
}