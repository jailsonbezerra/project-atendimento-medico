export default function ordenaByPrioridade(pacientes) {
    const ordemPrioridade = ['urgente', 'moderado', 'normal']

    return [...pacientes].sort((a, b) => {
        const prioA = (a.prioridade || '').toLocaleLowerCase()
        const prioB = (b.prioridade || '').toLocaleLowerCase()

        const indexA = ordemPrioridade.indexOf(prioA)
        const indexB = ordemPrioridade.indexOf(prioB)

        return indexA - indexB
    })
}
