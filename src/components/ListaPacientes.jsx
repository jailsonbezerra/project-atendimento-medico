import { useState } from "react"

import Filtro from "./Filtro"


export default function ListaPacientes({ pacientes, titulo }) {
    const [filtro, setFiltro] = useState(null)

    const pacientesFiltrados = filtro ? pacientes.filter(paciente => paciente.prioridade === filtro) : pacientes

    const ordemPrioridade = ['urgente', 'moderado', 'normal']

    pacientesFiltrados.sort((a, b) => {
        const indexA = ordemPrioridade.indexOf(a.prioridade.toLocaleLowerCase())
        const indexB = ordemPrioridade.indexOf(b.prioridade.toLocaleLowerCase())

        return indexA - indexB
    })

  return (
    <>
        { titulo && <Filtro onFiltro={setFiltro} titulo={titulo} filtroSelecionado={filtro} />}

        {
            pacientesFiltrados.map(paciente => (
                <article key={paciente.nome}>
                    <h2>{paciente.nome}</h2>
                    <p>Idade: {paciente.idade}</p>
                    <p>Prioridade: {paciente.prioridade}</p>
                    <button>Excluir</button>
                </article>
            ))
        }
    </>
  )
}