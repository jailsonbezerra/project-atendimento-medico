import { useState } from 'react'
import { getPacientes, salvarPacientes } from '../../utils/dados'

import './CadastroPaciente.css'


export default function CadastroPaciente() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    telefone: '',
    prioridade: 'Normal',
  });

  const prioridades = [
    { label: 'Urgente', cor: 'vermelho', descricao: 'Atendimento imediato' },
    { label: 'Moderado', cor: 'amarelo', descricao: 'Atendimento em breve' },
    { label: 'Normal', cor: 'verde', descricao: 'Atendimento padrão' },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handlePrioridade(prioridade) {
    setForm(prev => ({ ...prev, prioridade }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const pacientes = getPacientes()
    // Garante que todos os pacientes cadastrados NÃO tenham campo triagem nem atendimento
    pacientes.push({ ...form, triagem: undefined, atendimento: undefined });

    salvarPacientes(pacientes)
    
    alert('Paciente cadastrado com sucesso!');
    setForm({
      nome: '',
      cpf: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      prioridade: 'Normal',
    });
  }

  return (
    <main className="cadastro-paciente">
      <h1>Cadastro de Paciente</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome completo:</label>
        <input type="text" name="nome" id="nome" value={form.nome} onChange={handleChange} required />

        <label>CPF:</label>
        <input type="text" name="cpf" id="cpf" value={form.cpf} onChange={handleChange} required />

        <label>Data de nascimento:</label>
        <input type="date" name="dataNascimento" id="data-nascimento" value={form.dataNascimento} onChange={handleChange} required />

        <label>Endereço:</label>
        <input type="text" name="endereco" id="endereco" value={form.endereco} onChange={handleChange} required />

        <label>Telefone:</label>
        <input type="text" name="telefone" id="telefone" value={form.telefone} onChange={handleChange} required />

        <label>Prioridade de Atendimento:</label>
        <div className="prioridade">
          {prioridades.map((p) => (
            <button
              type="button"
              key={p.label}
              className={
                'prioridade-btn ' +
                p.cor +
                (form.prioridade === p.label ? ' active' : '')
              }
              onClick={() => handlePrioridade(p.label)}
            >
              <span>{p.label}</span>
              <small>{p.descricao}</small>
            </button>
          ))}
        </div>
        <button type="submit">Salvar</button>
      </form>
    </main>
  )
}