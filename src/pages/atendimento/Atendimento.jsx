import { useEffect, useRef, useState } from 'react'
import AtendimentoDetalhe from './AtendimentoDetalhe'
import ListaPacientes from '../../components/ListaPacientes'
import { getPacientes, salvarPaciente, deletarPaciente, registrarChamada } from '../../utils/dados'

import './Atendimento.css'


export default function Atendimento() {
  const [pacientes, setPacientes] = useState([])
  const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState(null)
  const [showDetalhe, setShowDetalhe] = useState(false)


  useEffect(() => {
    atualizarLista()

    function handleBeforeUnload() {
      const pacienteAtual = getPacientes().find(p => p.id === pacienteSelecionadoId)

      if (pacienteAtual && pacienteAtual.emAtendimento) {
        delete pacienteAtual.emAtendimento
        salvarPaciente(pacienteAtual)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)

      const pacienteAtual = getPacientes().find(p => p.id === pacienteSelecionadoId)

      if (pacienteAtual && pacienteAtual.emAtendimento) {
        delete pacienteAtual.emAtendimento
        salvarPaciente(pacienteAtual)
      }
    }
  }, [pacienteSelecionadoId])

  function atualizarLista() {
    const pacientesFiltrados = getPacientes().filter(p => p.triagem && !p.atendido)

    setPacientes(pacientesFiltrados)
  }

  function handleSelecionar(id) {
    const paciente = pacientes.find(p => p.id === id)
    if (!paciente) return

    const atualizado = { ...paciente, emAtendimento: true }
    salvarPaciente(atualizado)

    setPacienteSelecionadoId(id)
    setShowDetalhe(true)
    registrarChamada(atualizado, 'Consultório')
    atualizarLista()
  }

  function handleVoltar() {
    setShowDetalhe(false)

    if(pacienteSelecionadoId) {
      const paciente = getPacientes().find(p => p.id === pacienteSelecionadoId)
      
      if(paciente) {
        const atualizado = { ...paciente }
        delete atualizado.emAtendimento

        salvarPaciente(atualizado)
      }
    }

    setPacienteSelecionadoId(null)
    atualizarLista()
  }

  function handleFinalizarAtendimento(dadosAtendimento) {
    if(!pacienteSelecionadoId) return

    const paciente = getPacientes().find(p => p.id === pacienteSelecionadoId)

    if(!paciente) return

    const atualizado = {
      ...paciente,
      atendimento: dadosAtendimento,
      atendido: true
    }

    delete atualizado.emAtendimento

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
    <main className="atendimento">
      <ListaPacientes
        pacientes={pacientes}
        onSelecionar={handleSelecionar}
        onExcluir={excluirPaciente}
        titulo="Atendimento Médico"
      />

      {showDetalhe && pacienteSelecionado && (
        <AtendimentoDetalhe
          paciente={pacienteSelecionado}
          onVoltar={handleVoltar}
          onFinalizar={handleFinalizarAtendimento}
        />
      )}
    </main>
  )
}
