import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStethoscope, faUserCheck, faUserClock, faExclamationCircle, faCheckCircle, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { getPacientes } from '../../utils/dados'
import ordenaByPrioridade from '../../utils/ordenaByPrioridade'

import './PainelSituacao.css'


const statusLabels = {
    aguardando_triagem: { label: 'Esperando Triagem', icon: faClock },
    em_triagem: { label: 'Em Triagem', icon: faStethoscope },
    aguardando_atendimento: { label: 'Esperando Atendimento', icon: faUserClock },
    em_atendimento: { label: 'Em Atendimento', icon: faUserCheck },
}

function getStatus(paciente) {
    if (paciente.atendimento) return null // Já finalizado

    if (paciente.emAtendimento) return 'em_atendimento'

    if (paciente.triagem && !paciente.atendimento) return 'aguardando_atendimento'

    if (paciente.emTriagem) return 'em_triagem'

    return 'aguardando_triagem'
}

function getUltimosChamados() {
    // Busca lista de chamados do localStorage
    return JSON.parse(localStorage.getItem('ultimos_chamados') || '[]')
}

const prioridadeLegendas = [
    { cor: 'vermelho', label: 'Urgente', icon: faExclamationCircle },
    { cor: 'amarelo', label: 'Moderado', icon: faHeartbeat },
    { cor: 'verde', label: 'Normal', icon: faCheckCircle },
]

export default function PainelSituacao() {
    const [pacientes, setPacientes] = useState([]);
    const [ultimosChamados, setUltimosChamados] = useState([]);

    useEffect(() => {
        let ultimoPacientes = getPacientes()
        let ultimoChamados = localStorage.getItem('ultimos_chamados')

        function atualizarPainel() {
            const data = ordenaByPrioridade(getPacientes());
            setPacientes(data);
            setUltimosChamados(getUltimosChamados());
        }

        atualizarPainel()

        window.addEventListener('storage', atualizarPainel)

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') atualizarPainel()
        })

        // Atualização automática por polling
        const interval = setInterval(() => {
            const atualPacientes = getPacientes()

            ordenaByPrioridade(atualPacientes)

            const atualChamados = localStorage.getItem('ultimos_chamados')

            if (atualPacientes !== ultimoPacientes || atualChamados !== ultimoChamados) {
                ultimoPacientes = atualPacientes
                ultimoChamados = atualChamados

                atualizarPainel()
            }
        }, 1000)

        return () => {
            window.removeEventListener('storage', atualizarPainel)
            document.removeEventListener('visibilitychange', atualizarPainel)

            clearInterval(interval)
        }
    }, [])

    // Agrupa pacientes por status
    const statusMap = {
        aguardando_triagem: [],
        em_triagem: [],
        aguardando_atendimento: [],
        em_atendimento: [],
    }

    pacientes.forEach(p => {
        const status = getStatus(p)

        if (status) statusMap[status].push(p)
    })

    return (
        <main className="painel-situacao">
            <h1>Painel de Situação dos Pacientes</h1>

            {/* Botão de atualização removido, fluxo agora é 100% automático */}

            <div className="painel-legenda">
                <b>Legenda de Prioridade:</b>

                {prioridadeLegendas.map((p, idx) => (
                    <span key={idx} className={`legenda-prioridade prioridade-${p.cor}`}>
                        <FontAwesomeIcon icon={p.icon} /> {p.label}
                    </span>
                ))}
            </div>

            <div className="painel-colunas">
                {Object.entries(statusLabels).map(([status, { label, icon }]) => (
                    <div className="painel-coluna" key={status}>

                        <h2><FontAwesomeIcon icon={icon} className="painel-status-icon" /> {label}</h2>

                        {statusMap[status].length === 0 && <p className="vazio">Nenhum paciente</p>}

                        {statusMap[status].map((p, idx) => (
                            <div className={`painel-card prioridade-${p.prioridade?.toLowerCase()}${p.prioridade === 'Urgente' ? ' destaque-urgente' : ''}`} key={p.id || p.nome + idx}>
                                <span className="painel-nome">{p.nome}</span>

                                <span className="painel-prioridade">{p.prioridade}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="painel-chamados">
                <h2>Últimos 3 Pacientes Chamados</h2>

                {ultimosChamados.length === 0 && <p className="vazio">Nenhum chamado recente</p>}

                {ultimosChamados.map((c, idx) => (
                    <div className={`painel-card prioridade-${c.prioridade?.toLowerCase()}`} key={c.cpf || c.nome + idx}>
                        <span className="painel-nome">{c.nome}</span>

                        <span className="painel-prioridade">{c.prioridade}</span>

                        <span className="painel-local">{c.local || 'Consultório'}</span>
                    </div>
                ))}
            </div>
        </main>
    )
}