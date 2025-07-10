import { calcularIdade } from '../utils/date'

import './pacienteCard.css'


export default function PacienteCard({ paciente, onSelecionar, onExcluir }) {
    const prioridade = paciente.prioridade.toLowerCase();

    return (
        <article className={`paciente-card prioridade-${prioridade}`} onClick={() => onSelecionar(paciente.idx)}>
            <div className={`cor-prioridade ${prioridade}`}></div>

            <div className="paciente-card-header">
                <h2>{paciente.nome}</h2>
                {onExcluir && <p>Idade: {calcularIdade(paciente.dataNascimento)}</p>}
                <p>Prioridade: {paciente.prioridade}</p>

                {
                    onExcluir && <button className='btn-excluir' onClick={(e) => {e.stopPropagation(); onExcluir(paciente.idx);}}>Excluir</button>
                }
            </div>
        </article>
    );
}