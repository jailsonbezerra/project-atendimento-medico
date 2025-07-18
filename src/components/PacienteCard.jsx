import { calcularIdade } from '../utils/date'

import './PacienteCard.css'


export default function PacienteCard({ paciente, onSelecionar, onExcluir }) {
    const prioridade = (paciente.prioridade || '').toLowerCase();

    return (
        <article className={`paciente-card prioridade-${prioridade}`} onClick={() => onSelecionar(paciente.id)}>
            <div className={`cor-prioridade ${prioridade}`}></div>

            <div className="paciente-card-header">
                <h2>{paciente.nome}</h2>

                {typeof onExcluir === 'function' && <p>Idade: {calcularIdade(paciente.dataNascimento)}</p>}

                <p>Prioridade: {paciente.prioridade}</p>

                {
                    typeof onExcluir === 'function' && <button className='btn-excluir' onClick={(e) => { e.stopPropagation(); onExcluir(paciente.id); }}>Excluir</button>
                }
            </div>
        </article>
    )
}