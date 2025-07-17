import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Prioridade from "../../components/Prioridade"
import { getPacientes, registrarChamada, salvarPaciente } from "../../utils/dados"
import { calcularIdade } from "../../utils/date"

import './FormTriagem.css'


export default function FormTriagem() {
    const [formTriagem, setFormTriagem] = useState({
        temperatura: '',
        pressao: '',
        peso: '',
        altura: '',
        observacao: '',
        prioridade: 'Normal',
    })

    const [paciente, setPaciente] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    
    useEffect(() => {
      if(!paciente?.id) return
      
      registrarChamada(paciente, 'Triagem')
      
      const handleBeforeUnload = (event) => {
        event.preventDefault()
        event.returnValue = ""

        const pacienteAtualizado = {
            ...paciente,
            triagem: undefined,
        }

        pacienteAtualizado.emTriagem = false
        
        salvarPaciente(pacienteAtualizado)
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    }, [paciente]);

    useEffect(() => {
        const pacienteTriagem = getPacientes().find(p => String(p.id) === id)

        setPaciente(pacienteTriagem)

        if(pacienteTriagem && !pacienteTriagem.emTriagem) {
            const atualizado = { ...pacienteTriagem, emTriagem: true }
            salvarPaciente(atualizado)
        }

        return () => {
            if(pacienteTriagem && pacienteTriagem.emTriagem) {
                const pacienteParaResetar = { ...pacienteTriagem, emTriagem: false }
                salvarPaciente(pacienteParaResetar)
            }
        }
    }, [id])

    function handleChange(e) {
        const { name, value } = e.target

        setFormTriagem(prev => ({ ...prev, [name]: value }))
    }

    function handlePrioridade(novaPrioridade) {
        setFormTriagem(prev => ({ ...prev, prioridade: novaPrioridade }));
    }


    function handleSubmit(e) {
        e.preventDefault()

        if (!formTriagem.temperatura || !formTriagem.pressao || !formTriagem.peso || !formTriagem.altura) {
            alert('Preencha todos os campos obrigatórios!')

            return
        }

        const pacienteAtualizado = {
            ...paciente,
            triagem: formTriagem,
            prioridade: formTriagem.prioridade,
        }

        delete pacienteAtualizado.emTriagem
        salvarPaciente(pacienteAtualizado)

        alert('Triagem salva com sucesso!')
        navigate('/triagem')
    }

    function handleVoltar() {
        const pacienteAtualizado = {
            ...paciente,
            triagem: undefined,
        }

        pacienteAtualizado.emTriagem = false
        salvarPaciente(pacienteAtualizado)

        navigate('/triagem')
    }


  if (!paciente) return <main>Carregando dados do paciente...</main>

  return (
    <main className="triagem-detalhe-content">
      <h2>{`Triagem de ${paciente.nome}`}</h2>

      <div className="paciente-info">
        <div><b>Nome:</b> {paciente.nome}</div>
        <div><b>Idade:</b> {calcularIdade(paciente.dataNascimento)}</div>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="input-row">
          <div className="input-group">
            <label>Temperatura (°C):</label>

            <input
              type="number"
              step="0.1"
              name="temperatura"
              value={formTriagem.temperatura}
              onChange={handleChange}
              required
              placeholder="Ex: 36.7"
            />
          </div>

          <div className="input-group">
            <label>Pressão (mmHg):</label>

            <input
              type="text"
              name="pressao"
              value={formTriagem.pressao}
              onChange={handleChange}
              required
              placeholder="Ex: 12/8"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Peso (kg):</label>
            <input
              type="number"
              step="0.1"
              name="peso"
              value={formTriagem.peso}
              onChange={handleChange}
              required
              placeholder="Ex: 70.5"
            />
          </div>
          
          <div className="input-group">
            <label>Altura (cm):</label>

            <input
              type="number"
              step="0.1"
              name="altura"
              value={formTriagem.altura}
              onChange={handleChange}
              required
              placeholder="Ex: 175"
            />
          </div>
        </div>

        <label>Observação:</label>

        <textarea
          name="observacao"
          value={formTriagem.observacao}
          onChange={handleChange}
          rows={3}
          placeholder="Observações relevantes..."
        />

        <div className="botoes-triagem-row">
          <label className="label-reclassificar">Reclassificar Prioridade:</label>

          <Prioridade
            prioridade={formTriagem.prioridade}
            onChange={handlePrioridade}
          />

          <div className="botoes-triagem">
            <button className='btn-form cancelar-btn-triagem cancelar' type="button" onClick={() => handleVoltar()}>Cancelar</button>

            <button className='btn-form salvar-btn-triagem' type="submit">Salvar Triagem</button>
          </div>
        </div>
      </form>
    </main>
  )
}
