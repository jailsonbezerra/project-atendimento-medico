import { useEffect, useState } from 'react';
import './Atendimento.css';
import AtendimentoDetalhe from './AtendimentoDetalhe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faHeartbeat, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const prioridadeLegendas = [
  { cor: 'vermelho', label: 'Urgente', icon: faExclamationCircle },
  { cor: 'amarelo', label: 'Moderado', icon: faHeartbeat },
  { cor: 'verde', label: 'Normal', icon: faCheckCircle },
];

function registrarChamada(paciente, local = 'Consultório') {
  const ultimos = JSON.parse(localStorage.getItem('ultimos_chamados') || '[]');
  const novo = { nome: paciente.nome, prioridade: paciente.prioridade, cpf: paciente.cpf, local };
  const lista = [novo, ...ultimos.filter(p => p.cpf !== paciente.cpf)].slice(0, 3);
  localStorage.setItem('ultimos_chamados', JSON.stringify(lista));
}

export default function Atendimento() {
  const [pacientes, setPacientes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [showDetalhe, setShowDetalhe] = useState(false);
  const [filtroPrioridade, setFiltroPrioridade] = useState('');

  useEffect(() => {
    // Exibe apenas pacientes que já passaram pela triagem e ainda não foram atendidos
    const data = JSON.parse(localStorage.getItem('pacientes') || '[]');
    setPacientes(data.filter(p => p.triagem && !p.atendimento));
  }, [showDetalhe]);

  function handleSelecionar(idx) {
    setSelecionado(idx);
    setShowDetalhe(true);
    // Registra chamada ao abrir o atendimento
    registrarChamada(pacientes[idx]);
    // Marca paciente como em atendimento
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes[idx];
    const idxGeral = todos.findIndex(p => p.cpf === paciente.cpf);
    if (idxGeral !== -1) {
      todos[idxGeral] = { ...todos[idxGeral], emAtendimento: true };
      localStorage.setItem('pacientes', JSON.stringify(todos));
    }
  }

  function handleVoltar() {
    setShowDetalhe(false);
    // Remove status emAtendimento ao fechar
    if (selecionado !== null) {
      const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const paciente = pacientes[selecionado];
      const idxGeral = todos.findIndex(p => p.cpf === paciente.cpf);
      if (idxGeral !== -1) {
        const pacienteAtual = { ...todos[idxGeral] };
        delete pacienteAtual.emAtendimento;
        todos[idxGeral] = pacienteAtual;
        localStorage.setItem('pacientes', JSON.stringify(todos));
      }
    }
  }

  function handleSalvarAtendimento(dadosAtendimento) {
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const pacienteAtendido = pacientes[selecionado];
    const idxGeral = todos.findIndex(p => p.cpf === pacienteAtendido.cpf);
    if (idxGeral !== -1) {
      todos[idxGeral] = { ...todos[idxGeral], atendimento: dadosAtendimento };
      // Remove status emAtendimento ao salvar
      const pacienteAtual = { ...todos[idxGeral] };
      delete pacienteAtual.emAtendimento;
      todos[idxGeral] = pacienteAtual;
      localStorage.setItem('pacientes', JSON.stringify(todos));
    }
    setShowDetalhe(false);
  }

  function excluirPaciente(paciente) {
    if (!window.confirm(`Deseja realmente excluir o paciente ${paciente.nome}?`)) return;
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const novos = todos.filter(p => p.cpf !== paciente.cpf);
    localStorage.setItem('pacientes', JSON.stringify(novos));
    setPacientes(novos.filter(p => p.triagem && !p.atendimento));
  }

  const pacientesFiltrados = filtroPrioridade
    ? pacientes.filter(p => p.prioridade === filtroPrioridade)
    : pacientes;

  return (
    <main className="atendimento">
      <h1>Atendimento Médico</h1>
      <div className="painel-legenda">
        <span
          className={`legenda-prioridade prioridade-todos${!filtroPrioridade ? ' selecionado' : ''}`}
          onClick={() => setFiltroPrioridade('')}
          style={{ cursor: 'pointer', fontWeight: !filtroPrioridade ? 'bold' : 'normal', textDecoration: !filtroPrioridade ? 'underline' : 'none' }}
          title="Mostrar todos"
        >
          Todos
        </span>
        {prioridadeLegendas.map((p, idx) => (
          <span key={idx} className={`legenda-prioridade prioridade-${p.cor}${filtroPrioridade === p.label ? ' selecionado' : ''}`}
            onClick={() => setFiltroPrioridade(p.label)}
            style={{ cursor: 'pointer', fontWeight: filtroPrioridade === p.label ? 'bold' : 'normal', textDecoration: filtroPrioridade === p.label ? 'underline' : 'none' }}
            title={`Filtrar por ${p.label}`}
          >
            <FontAwesomeIcon icon={p.icon} /> {p.label}
          </span>
        ))}
      </div>
      <div className="cards-atendimento">
        {pacientesFiltrados.length === 0 && <p>Nenhum paciente aguardando atendimento.</p>}
        {pacientesFiltrados.map((p, idx) => (
          <div
            className={`card-atendimento prioridade-${p.prioridade?.toLowerCase()}`}
            key={idx}
            tabIndex={0}
            onClick={() => handleSelecionar(idx)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelecionar(idx)}
          >
            <h2>{p.nome}</h2>
            <p><b>Idade:</b> {p.dataNascimento ? new Date().getFullYear() - new Date(p.dataNascimento).getFullYear() : '-'}</p>
            <p><b>Prioridade:</b> {p.prioridade}</p>
            <p><b>Triagem:</b> {p.triagem ? 'Realizada' : 'Pendente'}</p>
            <button className="excluir-btn" title="Excluir paciente" onClick={e => { e.stopPropagation(); excluirPaciente(p); }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      {showDetalhe && selecionado !== null && (
        <AtendimentoDetalhe
          paciente={pacientes[selecionado]}
          onVoltar={handleVoltar}
          onSalvar={handleSalvarAtendimento}
        />
      )}
    </main>
  );
}
