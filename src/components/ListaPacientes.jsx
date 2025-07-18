import { useState } from "react"
import Filtro from "./Filtro"
import PacienteCard from "./PacienteCard"
import ordenaByPrioridade from "../utils/ordenaByPrioridade"

import './ListaPacientes.css'


export default function ListaPacientes({ pacientes, titulo, onExcluir, onSelecionar }) {
    const [filtro, setFiltro] = useState(null)

    let pacientesFiltrados = filtro ? pacientes.filter(paciente => paciente.prioridade === filtro) : pacientes

    pacientesFiltrados = ordenaByPrioridade(pacientesFiltrados)

    return (
        <section className="lista-pacientes">
            {titulo && <Filtro onFiltro={setFiltro} titulo={titulo} filtroSelecionado={filtro} />}

            {pacientesFiltrados.length === 0 && <p>Nenhum paciente.</p>}

            {
                pacientesFiltrados.map((paciente) => (
                    <PacienteCard key={paciente.id} paciente={paciente} {...(onExcluir && { onExcluir: () => onExcluir(paciente.id) })} onSelecionar={() => onSelecionar(paciente.id)} />
                ))
            }
        </section >
    )
}