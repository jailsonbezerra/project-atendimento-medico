function getPacientes() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]')

    return pacientes
}

function getPaciente(cpf) {
    const pacientes = getPacientes()
    const paciente = pacientes.find(p => p.cpf === cpf)

    return paciente
}

function salvarPaciente(paciente) {
    const id = pacientes.findIndex(p => p.cpf === paciente.cpf)

    const pacientesAtualizados = [...pacientes]

    if (id !== -1) {
        pacientesAtualizados[id] = paciente
    } else {
        pacientesAtualizados.push(paciente)
    }

    localStorage.setItem('pacientes', JSON.stringify(pacientesAtualizados))
    window.dispatchEvent(new Event('storage'))
    window.location.reload()
}

function salvarPacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
    window.dispatchEvent(new Event('storage'))
    window.location.reload()
}

function deletarPaciente(cpf) {
    const pacientes = getPacientes()
    const pacientesFiltrados = pacientes.filter(p => p.cpf !== cpf)

    salvarPacientes(pacientesFiltrados)
}

export { getPacientes, getPaciente, salvarPaciente, salvarPacientes, deletarPaciente }