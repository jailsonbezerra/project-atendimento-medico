import { useState } from 'react'

import './CadastroPaciente.css'


export default function CadastroPaciente() {
  return (
    <main className="cadastro-paciente">
        <h1>Cadastro de Paciente</h1>

        <form action="">
            <label>Nome cpmpleto:</label>
            <input type="text" name="nome" id="nome" />

            <label>CPF:</label>
            <input type="text" name="cpf" id="cpf" />

            <label>Data de nascimento:</label>
            <input type="date" name="data-nascimento" id="data-nascimento" />

            <label>Endereço:</label>
            <input type="text" name="endereco" id="endereco" />

            <label>Telefone:</label>
            <input type="text" name="telefone" id="telefone" />

            <label>Prioridade de Atendimento:</label>
            
            <div className="prioridade">

                <button>
                    <span>Urgente</span>
                    <small>Atendimento imediato</small>
                </button>
            </div>
        </form>
    </main>
  )
}