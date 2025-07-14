import { v4 as uuid } from 'uuid'
import pacientesData from './pacientesAleatorios.json'


function getPacientes() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]')

    return pacientes;
}

function getPaciente(id) {
    const pacientes = getPacientes()
    const paciente = pacientes.find(p => p.id === id)

    return paciente
}

function salvarPaciente(paciente) {
    const pacientesAtuais = getPacientes()
    const idx = pacientesAtuais.findIndex(p => p.id === paciente.id)

    const pacienteAtualizados = [...pacientesAtuais]

    if (idx !== -1) {
        pacienteAtualizados[idx] = paciente
    } else {
        const pacienteComId = paciente.id ? paciente : { ...paciente, id: uuid() }
        pacienteAtualizados.push(pacienteComId)
    }

    localStorage.setItem('pacientes', JSON.stringify(pacienteAtualizados))
    window.dispatchEvent(new Event('storage'))
}

function salvarPacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
    window.dispatchEvent(new Event('storage'))
}

function deletarPaciente(id) {
    const pacientes = getPacientes()
    const pacientesFiltrados = pacientes.filter(p => p.id !== id)
    salvarPacientes(pacientesFiltrados)

    console.log(`Paciente ${id} removido com sucesso!`)
}

function inicializarPacientesAleatorios() {
    const pacientesExistentes = getPacientes()
    if (pacientesExistentes.length > 0) {
        console.log("Pacientes já existem no localStorage. Não inicializando com dados aleatórios novamente.")

        return
    }

    const pacientesComId = pacientesData.map(paciente => ({
        id: uuid(), 
        ...paciente
    }))

    salvarPacientes(pacientesComId)
    console.log("Pacientes aleatórios inicializados e salvos no localStorage.")
}


export { getPacientes, getPaciente, salvarPaciente, salvarPacientes, deletarPaciente, inicializarPacientesAleatorios }