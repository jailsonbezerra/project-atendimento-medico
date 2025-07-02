import { useState } from 'react';
import './AtendimentoDetalhe.css';

export default function AtendimentoDetalhe({ paciente, onVoltar, onSalvar }) {
  const [form, setForm] = useState({
    motivo: '',
    diagnostico: '',
    prescricao: '',
    observacao: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(form);
  }

  if (!paciente) return null;

  // Função para calcular idade
  function calcularIdade(dataNascimento) {
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

  // Função para calcular IMC
  function calcularIMC(peso, altura) {
    if (!peso || !altura) return '-';
    const alturaM = Number(altura) / 100;
    if (!alturaM) return '-';
    const imc = Number(peso) / (alturaM * alturaM);
    if (!imc || isNaN(imc) || !isFinite(imc)) return '-';
    return imc.toFixed(1);
  }

  // Dados de triagem
  const triagem = paciente.triagem || {};

  return (
    <div className="atendimento-detalhe-modal">
      <div className="atendimento-detalhe-content">
        <button className="fechar" onClick={onVoltar} title="Fechar">×</button>
        <h2>Atendimento de {paciente.nome}</h2>
        <div className="info-basica-atendimento" style={{
          background: '#f5f9ff',
          borderRadius: 10,
          padding: '12px 18px',
          marginBottom: 18,
          boxShadow: '0 1px 8px rgba(42,92,141,0.09)',
          color: '#2a5c8d',
          fontSize: '1.05rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem 2.5rem',
        }}>
          <div><b>Nome:</b> {paciente.nome}</div>
          <div><b>Idade:</b> {calcularIdade(paciente.dataNascimento)}</div>
          <div><b>Sexo:</b> {paciente.sexo || '-'}</div>
          <div><b>Temperatura:</b> {triagem.temperatura || '-'}</div>
          <div><b>Pressão:</b> {triagem.pressao || '-'}</div>
          <div><b>IMC:</b> {calcularIMC(triagem.peso, triagem.altura)}</div>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>Motivo da Consulta:</label>
          <input type="text" name="motivo" value={form.motivo} onChange={handleChange} required />

          <label>Diagnóstico:</label>
          <input type="text" name="diagnostico" value={form.diagnostico} onChange={handleChange} required />

          <label>Prescrição:</label>
          <textarea name="prescricao" value={form.prescricao} onChange={handleChange} rows={2} />

          <label>Observação:</label>
          <textarea name="observacao" value={form.observacao} onChange={handleChange} rows={2} />

          <div className="botoes-atendimento-row">
            <button type="submit" className="salvar-btn-atendimento">Salvar Atendimento</button>
          </div>
        </form>
      </div>
    </div>
  );
}
