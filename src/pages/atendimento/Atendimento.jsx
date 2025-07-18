import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListaPacientes from '../../components/ListaPacientes'
import { getPacientes, deletarPaciente } from '../../utils/dados'

import './Atendimento.css'


export default function Atendimento() {
    const [pacientes, setPacientes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        atualizarLista()
    }, [])

    function atualizarLista() {
        const pacientesFiltrados = getPacientes().filter(p => p.triagem && !p.atendimento)

        setPacientes(pacientesFiltrados)
    }

    function handleSelecionar(id) {
        const paciente = pacientes.find(p => p.id === id)

        if (!paciente) return

        navigate(`/atendimento/${id}`)
    }

    function excluirPaciente(id) {
        deletarPaciente(id)

        atualizarLista()
    }

    return (
        <main className="atendimento">
            <ListaPacientes
                pacientes={pacientes}
                onSelecionar={handleSelecionar}
                onExcluir={excluirPaciente}
                titulo="Atendimento Médico"
            />
        </main>
    )
}