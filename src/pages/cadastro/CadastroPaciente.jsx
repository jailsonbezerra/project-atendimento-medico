import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import Prioridade from '../../components/Prioridade'
import { getPacientes, salvarPacientes } from '../../utils/dados'

import './CadastroPaciente.css'


export default function CadastroPaciente() {
    const [form, setForm] = useState({
        id: uuid(),
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: '',
        telefone: '',
        prioridade: 'Normal',
    })



    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handlePrioridade(novaPrioridade) {
        setForm(prev => ({ ...prev, prioridade: novaPrioridade }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const pacientes = getPacientes()
        pacientes.push({ ...form, triagem: undefined, atendimento: undefined })

        salvarPacientes(pacientes)

        alert('Paciente cadastrado com sucesso!')

        setForm({
            id: uuid(),
            nome: '',
            cpf: '',
            dataNascimento: '',
            endereco: '',
            telefone: '',
            prioridade: 'Normal',
        })
    }

    return (
        <main className="cadastro-paciente">
            <h1>Cadastro de Paciente</h1>
            <form onSubmit={handleSubmit}>
                <label>Nome completo:</label>
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    value={form.nome} 
                    onChange={handleChange} 
                    required 
                />

                <label>CPF:</label>
                <input 
                    type="text"
                    name="cpf" 
                    id="cpf" 
                    value={form.cpf} 
                    onChange={handleChange} 
                    required 
                />

                <label>Data de nascimento:</label>
                <input 
                    type="date" 
                    name="dataNascimento" 
                    id="data-nascimento" 
                    value={form.dataNascimento} 
                    onChange={handleChange} 
                    required 
                />

                <label>Endereço:</label>
                <input 
                    type="text" 
                    name="endereco" 
                    id="endereco" 
                    value={form.endereco} 
                    onChange={handleChange} 
                    required 
                />

                <label>Telefone:</label>
                <input 
                    type="text" 
                    name="telefone" 
                    id="telefone" 
                    value={form.telefone} 
                    onChange={handleChange} 
                    required 
                />

                <label>Prioridade de Atendimento:</label>

                <div className="prioridade">
                    <Prioridade
                        prioridade={form.prioridade}
                        onChange={handlePrioridade}
                    />
                </div>
                
                <button type="submit">Salvar</button>
            </form>
        </main>
    )
}