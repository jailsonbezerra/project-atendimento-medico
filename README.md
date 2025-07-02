# Hospital Atendimento Web System

Sistema web para gerenciamento do fluxo de atendimento hospitalar, desenvolvido com Vite + React.

## Visão Geral

O projeto tem como objetivo organizar e facilitar o fluxo de pacientes em um ambiente hospitalar, desde o cadastro até o atendimento, com foco em responsividade, usabilidade e clareza visual.

## Funcionalidades

- **Cadastro de Pacientes**: Registro de novos pacientes com dados básicos.
- **Triagem**: Registro de sinais vitais, observações e classificação de prioridade (Urgente, Moderado, Normal).
- **Atendimento**: Visualização dos dados do paciente e triagem, registro do atendimento médico.
- **Painel de Situação**: Exibição em tempo real do status dos pacientes, sem opção de exclusão.
- **Reclassificação de Prioridade**: Botões destacados e responsivos para reclassificação durante a triagem.
- **Responsividade**: Layout adaptado para desktop, tablet e mobile.
- **Experiência do Usuário**: Botões sempre visíveis, destaque para ações principais, rolagem suave em listas longas.

## Estrutura do Projeto

```
c:\project-atendimento-medico
│
├── public/                # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e ícones
│   ├── components/        # Componentes globais (Header, Nav, etc.)
│   ├── hooks/             # Hooks customizados
│   ├── pages/
│   │   ├── cadastro/      # Página de cadastro de pacientes
│   │   ├── triagem/
│   │   │   ├── components/  # Componentes reutilizáveis da triagem
│   │   │   ├── TriagemDetalhe.jsx
│   │   │   ├── TriagemDetalhe.css
│   │   │   └── ...
│   │   ├── atendimento/   # Página de atendimento
│   │   ├── painel/        # Painel de situação
│   ├── utils/             # Funções utilitárias (ex: calcular idade)
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # CSS global
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
├── README.md              # Este arquivo
└── ...
```

## Principais Componentes

- `Header`, `Nav`: Navegação principal.
- `PacienteInfo`: Exibe informações básicas do paciente na triagem.
- `PrioridadeTriagem`: Botões de reclassificação de prioridade.
- `useFormFields`: Hook customizado para controle de formulários.

## Boas Práticas Adotadas

- Componentização e reutilização de código.
- Separação de responsabilidades (componentes, hooks, utils).
- CSS modularizado por página/componente.
- Funções utilitárias em `utils/`.
- Responsividade com media queries e flexbox.
- Sem lógica inline desnecessária.

## Como Executar o Projeto

1. **Pré-requisitos:**
   - Node.js 18+
   - npm ou yarn

2. **Instalação:**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Execução em modo desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Build para produção:**
   ```bash
   npm run build
   # ou
   yarn build
   ```

5. **Acesso:**
   - Acesse `http://localhost:5173` no navegador.

## Observações

- O sistema não implementa backend, persistência ou autenticação por padrão (apenas front-end).
- Para integração com API, adapte os métodos de cada página conforme necessário.
- O painel de situação é atualizado automaticamente conforme alterações nas etapas anteriores.

## Contato

Dúvidas ou sugestões? Abra uma issue ou entre em contato com o responsável pelo projeto.
