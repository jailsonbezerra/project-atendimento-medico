import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPacientes, registrarChamada, salvarPaciente } from '../../utils/dados'
import { calcularIdade, calcularIMC } from '../../utils/date'

import './FormAtendimento.css'


export default function FormAtendimento() {
    const [formAtendimento, setFormAtendimento] = useState({
        motivo: '',
        diagnostico: '',
        prescricao: '',
        observacao: '',
    });

    const [paciente, setPaciente] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const salvoRef = useRef(false)

    useEffect(() => {
        const pacienteAtendimento = getPacientes().find(p => String(p.id) === id)

        if (!pacienteAtendimento) return

        setPaciente(pacienteAtendimento)

        if (!pacienteAtendimento.emAtendimento && !salvoRef.current) {
            pacienteAtendimento.emAtendimento = true

            salvarPaciente(pacienteAtendimento)
        }

        return () => {
            if (pacienteAtendimento && pacienteAtendimento.emAtendimento && !salvoRef.current) {
                pacienteAtendimento.emAtendimento = false

                salvarPaciente(pacienteAtendimento)
            }
        }
    }, [id])

    useEffect(() => {
        if (!paciente?.id) return

        registrarChamada(paciente, 'Atendimento')

        const handleBeforeUnload = (event) => {
            if (salvoRef.current) return

            event.preventDefault()

            event.returnValue = ""

            const pacienteAtualizado = {
                ...paciente,
            }

            pacienteAtualizado.emAtendimento = false

            console.log('finalizando', paciente)

            salvarPaciente(pacienteAtualizado)
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [paciente]);

    function handleChange(e) {
        const { name, value } = e.target

        setFormAtendimento(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!formAtendimento.motivo || !formAtendimento.diagnostico || !formAtendimento.prescricao) {
            alert('Preencha todos os campos')

            return
        }

        const pacienteAtualizado = {
            ...paciente,
            atendimento: formAtendimento,
        }

        delete pacienteAtualizado.emAtendimento

        salvarPaciente(pacienteAtualizado)

        salvoRef.current = true

        console.log('submit', pacienteAtualizado)

        alert('Atendimento salvo com sucesso!')

        navigate('/atendimento')

        window.scrollTo(0, 0)
    }

    function handleVoltar() {
        const pacienteAtualizado = {
            ...paciente,
            atendimento: undefined,
        }

        pacienteAtualizado.emAtendimento = false

        salvarPaciente(pacienteAtualizado)

        navigate('/atendimento')
    }

    if (!paciente?.id) return <main><p>Paciente: {id}, não encontrado</p></main>

    return (
        <main className="atendimento-detalhe-content">
            <h2>Atendimento de {paciente.nome}</h2>

            <div className='paciente-info'>
                <div><b>Nome:</b> {paciente.nome}</div>
                <div><b>Idade:</b> {calcularIdade(paciente.dataNascimento)}</div>
                <div><b>Temperatura:</b> {paciente.triagem?.temperatura || ''}</div>
                <div><b>Pressão:</b> {paciente.triagem?.pressao || ''}</div>
                <div><b>IMC:</b> {calcularIMC(paciente.triagem.peso, paciente.triagem.altura)}</div>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
                <label>Motivo da Consulta:</label>
                <input
                    type="text"
                    name="motivo"
                    value={formAtendimento.motivo}
                    onChange={handleChange}
                    required
                />

                <label>Diagnóstico:</label>
                <input
                    type="text"
                    name="diagnostico"
                    value={formAtendimento.diagnostico}
                    onChange={handleChange}
                    required
                />

                <label>Prescrição:</label>
                <textarea
                    name="prescricao"
                    value={formAtendimento.prescricao}
                    onChange={handleChange}
                    rows={2}
                />

                <label>Observação:</label>
                <textarea
                    name="observacao"
                    value={formAtendimento.observacao}
                    onChange={handleChange}
                    rows={2}
                />

                <div className="botoes-atendimento">
                    <button className="btn-form cancelar-btn-atendimento cancelar" type="button" onClick={handleVoltar}>Voltar</button>

                    <button className="btn-form salvar-btn-atendimento" type="submit">Salvar Atendimento</button>
                </div>
            </form>
        </main>
    )
}
