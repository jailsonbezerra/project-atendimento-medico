import { useEffect, useState } from 'react';
import './Triagem.css';
import TriagemDetalhe from './TriagemDetalhe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faHeartbeat, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const prioridadeLegendas = [
  { cor: 'vermelho', label: 'Urgente', icon: faExclamationCircle },
  { cor: 'amarelo', label: 'Moderado', icon: faHeartbeat },
  { cor: 'verde', label: 'Normal', icon: faCheckCircle },
];

function registrarChamadaTriagem(paciente, local = 'Sala de Triagem') {
  const ultimos = JSON.parse(localStorage.getItem('ultimos_chamados') || '[]');
  const novo = { nome: paciente.nome, prioridade: paciente.prioridade, cpf: paciente.cpf, local };
  const lista = [novo, ...ultimos.filter(p => p.cpf !== paciente.cpf)].slice(0, 3);
  localStorage.setItem('ultimos_chamados', JSON.stringify(lista));
}

export default function Triagem() {
  const [pacientes, setPacientes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [showDetalhe, setShowDetalhe] = useState(false);
  const [filtroPrioridade, setFiltroPrioridade] = useState('');

  useEffect(() => {
    // Exibe apenas pacientes que NÃO possuem triagem
    const data = JSON.parse(localStorage.getItem('pacientes') || '[]');
    setPacientes(data.filter(p => !p.triagem));
  }, [showDetalhe]);

  function handleSelecionar(idx) {
    setSelecionado(idx);
    setShowDetalhe(true);
    // Registra chamada ao abrir triagem
    registrarChamadaTriagem(pacientes[idx]);
    // Marca paciente como em triagem
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientes[idx];
    const idxGeral = todos.findIndex(p => p.cpf === paciente.cpf);
    if (idxGeral !== -1) {
      todos[idxGeral] = { ...todos[idxGeral], emTriagem: true };
      localStorage.setItem('pacientes', JSON.stringify(todos));
    }
  }

  function handleVoltar() {
    setShowDetalhe(false);
    // Remove status emTriagem ao fechar
    if (selecionado !== null) {
      const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const paciente = pacientes[selecionado];
      const idxGeral = todos.findIndex(p => p.cpf === paciente.cpf);
      if (idxGeral !== -1) {
        const pacienteAtual = { ...todos[idxGeral] };
        delete pacienteAtual.emTriagem;
        todos[idxGeral] = pacienteAtual;
        localStorage.setItem('pacientes', JSON.stringify(todos));
      }
    }
  }

  function handleSalvarTriagem(dadosTriagem) {
    // Salva os dados de triagem junto ao paciente selecionado
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const pacienteTriado = pacientes[selecionado];
    const idxGeral = todos.findIndex(p => p.cpf === pacienteTriado.cpf);
    if (idxGeral !== -1) {
      // Atualiza prioridade se reclassificada
      let novoPaciente = { ...todos[idxGeral], triagem: dadosTriagem };
      if (dadosTriagem.prioridade && dadosTriagem.prioridade !== todos[idxGeral].prioridade) {
        novoPaciente.prioridade = dadosTriagem.prioridade;
      }
      delete novoPaciente.emTriagem;
      todos[idxGeral] = novoPaciente;
      localStorage.setItem('pacientes', JSON.stringify(todos));
      window.dispatchEvent(new Event('storage'));
    }
    // Atualiza a lista imediatamente após salvar
    setPacientes(todos.filter(p => !p.triagem));
    setShowDetalhe(false);
  }

  function excluirPaciente(paciente) {
    if (!window.confirm(`Deseja realmente excluir o paciente ${paciente.nome}?`)) return;
    const todos = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const novos = todos.filter(p => p.cpf !== paciente.cpf);
    localStorage.setItem('pacientes', JSON.stringify(novos));
    setPacientes(novos.filter(p => !p.triagem));
  }

  const pacientesFiltrados = filtroPrioridade
    ? pacientes.filter(p => p.prioridade === filtroPrioridade)
    : pacientes;

  return (
    <main className="triagem">
      <h1>Triagem de Pacientes</h1>
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
      <div className="cards-triagem">
        {pacientesFiltrados.length === 0 && <p>Nenhum paciente aguardando triagem.</p>}
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
            <button className="excluir-btn" title="Excluir paciente" onClick={e => { e.stopPropagation(); excluirPaciente(p); }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      {showDetalhe && selecionado !== null && (
        <TriagemDetalhe
          paciente={pacientes[selecionado]}
          onVoltar={handleVoltar}
          onSalvar={handleSalvarTriagem}
        />
      )}
    </main>
  );
}
