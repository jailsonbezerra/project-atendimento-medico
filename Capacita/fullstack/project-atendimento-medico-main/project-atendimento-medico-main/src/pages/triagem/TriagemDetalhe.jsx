import { useEffect, useState } from 'react';
import './TriagemDetalhe.css';
import PacienteInfo from './components/PacienteInfo';
import PrioridadeTriagem from './components/PrioridadeTriagem';

const prioridades = [
  { label: 'Urgente', cor: 'vermelho' },
  { label: 'Moderado', cor: 'amarelo' },
  { label: 'Normal', cor: 'verde' },
];

export default function TriagemDetalhe({ paciente, onVoltar, onSalvar }) {
  const [form, setForm] = useState({
    temperatura: '',
    pressao: '',
    peso: '',
    altura: '',
    observacao: '',
    prioridade: paciente?.prioridade || 'Normal',
  });

  useEffect(() => {
    // Preenche com dados já existentes, se houver
    if (paciente?.triagem) {
      setForm({
        temperatura: paciente.triagem.temperatura || '',
        pressao: paciente.triagem.pressao || '',
        peso: paciente.triagem.peso || '',
        altura: paciente.triagem.altura || '',
        observacao: paciente.triagem.observacao || '',
        prioridade: paciente.triagem.prioridade || paciente.prioridade || 'Normal',
      });
    }
  }, [paciente]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handlePrioridade(prioridade) {
    setForm(prev => ({ ...prev, prioridade }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validação simples
    if (!form.temperatura || !form.pressao || !form.peso || !form.altura) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    onSalvar(form);
  }

  if (!paciente) return null;

  return (
    <div className="triagem-detalhe-modal">
      <div className="triagem-detalhe-content">
        <button className="fechar" onClick={onVoltar}>×</button>
        <h2>Triagem de {paciente.nome}</h2>
        <PacienteInfo nome={paciente.nome} dataNascimento={paciente.dataNascimento} sexo={paciente.sexo} />
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-row">
            <div className="input-group">
              <label>Temperatura (°C):</label>
              <input type="number" step="0.1" name="temperatura" value={form.temperatura} onChange={handleChange} required placeholder="Ex: 36.7" />
            </div>
            <div className="input-group">
              <label>Pressão (mmHg):</label>
              <input type="text" name="pressao" value={form.pressao} onChange={handleChange} required placeholder="Ex: 12/8" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Peso (kg):</label>
              <input type="number" step="0.1" name="peso" value={form.peso} onChange={handleChange} required placeholder="Ex: 70.5" />
            </div>
            <div className="input-group">
              <label>Altura (cm):</label>
              <input type="number" step="0.1" name="altura" value={form.altura} onChange={handleChange} required placeholder="Ex: 175" />
            </div>
          </div>
          <label>Observação:</label>
          <textarea name="observacao" value={form.observacao} onChange={handleChange} rows={3} placeholder="Observações relevantes..." />

          <div className="botoes-triagem-row">
            <label className="label-reclassificar">Reclassificar Prioridade:</label>
            <PrioridadeTriagem prioridades={prioridades} prioridadeAtual={form.prioridade} onChange={handlePrioridade} />
            <button type="submit" className="salvar-btn-triagem">Salvar Triagem</button>
          </div>
        </form>
      </div>
    </div>
  );
}
