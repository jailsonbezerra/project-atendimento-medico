import { useEffect, useState } from 'react'
import TriagemDetalhe from './TriagemDetalhe'
import ListaPacientes from '../../components/ListaPacientes'
import { getPacientes, salvarPaciente, deletarPaciente } from '../../utils/dados'

import './Triagem.css'

function registrarChamada(paciente, local = 'Sala de Triagem') {
  const ultimos = JSON.parse(localStorage.getItem('ultimos_chamados') || '[]')
  const novo = { nome: paciente.nome, prioridade: paciente.prioridade, cpf: paciente.cpf, local }
  const lista = [novo, ...ultimos.filter(p => p.cpf !== paciente.cpf)].slice(0, 3)
  localStorage.setItem('ultimos_chamados', JSON.stringify(lista))
}

export default function Triagem() {
  const [pacientes, setPacientes] = useState([])
  const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState(null)
  const [showDetalhe, setShowDetalhe] = useState(false)

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

    const atualizado = { ...paciente, emTriagem: true }
    salvarPaciente(atualizado)

    setPacienteSelecionadoId(id)
    setShowDetalhe(true)
    registrarChamada(atualizado)
    atualizarLista()
  }

  function handleVoltar() {
    setShowDetalhe(false)

    if (pacienteSelecionadoId) {
      const paciente = getPacientes().find(p => p.id === pacienteSelecionadoId)
      if (paciente) {
        const atualizado = { ...paciente }
        delete atualizado.emTriagem
        salvarPaciente(atualizado)
      }
    }

    setPacienteSelecionadoId(null)
    atualizarLista()
  }

  function handleSalvarTriagem(dadosTriagem) {
    if (!pacienteSelecionadoId) return

    const paciente = getPacientes().find(p => p.id === pacienteSelecionadoId)
    if (!paciente) return

    const atualizado = {
      ...paciente,
      triagem: dadosTriagem,
      prioridade: dadosTriagem.prioridade
    }

    delete atualizado.emTriagem
    salvarPaciente(atualizado)

    setShowDetalhe(false)
    setPacienteSelecionadoId(null)
    atualizarLista()
  }

  function excluirPaciente(id) {
    deletarPaciente(id)
    atualizarLista()
  }

  const pacienteSelecionado = pacienteSelecionadoId
    ? getPacientes().find(p => p.id === pacienteSelecionadoId)
    : null

  return (
    <main className="triagem">
      <ListaPacientes
        pacientes={pacientes}
        onSelecionar={handleSelecionar}
        onExcluir={excluirPaciente}
        titulo="Triagem de Pacientes"
      />

      {showDetalhe && pacienteSelecionado && (
        <TriagemDetalhe
          paciente={pacienteSelecionado}
          onVoltar={handleVoltar}
          onSalvar={handleSalvarTriagem}
        />
      )}
    </main>
  )
}