import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListaPacientes from '../../components/ListaPacientes'
import { getPacientes, deletarPaciente } from '../../utils/dados'

import './Triagem.css'


export default function Triagem() {
    const [pacientes, setPacientes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        atualizarLista()
    }, [])

    function atualizarLista() {
        const pacientesFiltrados = getPacientes().filter(p => !p.triagem)

        setPacientes(pacientesFiltrados)
    }

    function handleSelecionar(id) {
        const paciente = pacientes.find(p => p.id === id)

        if (!paciente) return

        navigate(`/triagem/${id}`)
    }

    function excluirPaciente(id) {
        deletarPaciente(id)

        atualizarLista()
    }

    return (
        <main className="triagem">
            <ListaPacientes
                pacientes={pacientes}
                onSelecionar={handleSelecionar}
                onExcluir={excluirPaciente}
                titulo="Triagem de Pacientes"
            />
        </main>
    )
}
