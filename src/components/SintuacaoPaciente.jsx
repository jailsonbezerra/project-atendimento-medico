import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPacientes } from "../utils/dados"


export default function SintuacaoPaciente() {
    const [paciente, setPaciente] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const paciente = getPacientes().find(p => p.id === id)
        setPaciente(paciente)
    }, [])

    return (
        <main>
            <h2>Situação do Paciente</h2>

            {
                !paciente.triagem && <p>Paciente ainda não foi triado</p>
            }

            {
                paciente.triagem && <p>Paciente já foi triado</p>
            }

            <p>Nome: {paciente.nome}</p>
            <p>CPF: {paciente.cpf}</p>
            <p>Telefone: {paciente.telefone}</p>
            <p>Endereço: {paciente.endereco}</p>
            <p>Data de Nascimento: {paciente.dataNascimento}</p>

        </main>
    )
}