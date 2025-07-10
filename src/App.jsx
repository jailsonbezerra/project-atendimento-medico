import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import CadastroPaciente from './pages/cadastro/CadastroPaciente'
import Triagem from './pages/triagem/Triagem'
import Atendimento from './pages/atendimento/Atendimento'
import PainelSituacao from './pages/painel/PainelSituacao'
import ListaPacientes from './components/ListaPacientes'
import { getPacientes } from './utils/dados'

const pacientes = getPacientes()

function App() {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<CadastroPaciente />} />
        <Route path='/triagem' element={<Triagem />} />
        <Route path='/atendimento' element={<Atendimento />} />
        <Route path='/painel' element={<PainelSituacao />} />
        <Route path='/lista' element={<ListaPacientes pacientes={pacientes} titulo={'Lista de Pacientes'} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
