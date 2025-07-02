import { calcularIdade } from '../../../utils/date';

// Componente para exibir informações básicas do paciente na triagem
export default function PacienteInfo({ nome, dataNascimento, sexo }) {
  return (
    <div className="paciente-info">
      <span><b>Nome:</b> {nome}</span>
      <span><b>Idade:</b> {calcularIdade(dataNascimento)}</span>
      <span><b>Sexo:</b> {sexo || '-'}</span>
    </div>
  );
}
