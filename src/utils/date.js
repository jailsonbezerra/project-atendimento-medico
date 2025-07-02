// Função utilitária para calcular idade a partir da data de nascimento
export function calcularIdade(dataNascimento) {
  if (!dataNascimento) return '-';
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}
