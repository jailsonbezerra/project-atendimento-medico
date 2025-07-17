import { useState } from 'react';

import './AtendimentoDetalhe.css';
import { calcularIdade, calcularIMC } from '../../utils/date';


export default function AtendimentoDetalhe({ paciente, onVoltar, onFinalizar }) {
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
    onFinalizar(form);
  }

  if (!paciente) return null;

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
          <div><b>Temperatura:</b> {paciente.triagem.temperatura || '-'}</div>
          <div><b>Pressão:</b> {paciente.triagem.pressao || '-'}</div>
          <div><b>IMC:</b> {calcularIMC(paciente.triagem.peso, paciente.triagem.altura)}</div>
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
