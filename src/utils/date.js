// Função utilitária para calcular idade a partir da data de nascimento
export function calcularIdade(dataNascimento) {
  const dataAtual = new Date()
  const idade = (dataAtual - new Date(dataNascimento)) / (1000 * 60 * 60 * 24 * 365)

  return Math.floor(idade)
}
