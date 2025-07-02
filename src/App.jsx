import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import Header from './components/Header'
import CadastroPaciente from './pages/cadastro/CadastroPaciente'
import Triagem from './pages/triagem/Triagem'
import Atendimento from './pages/atendimento/Atendimento'
import PainelSituacao from './pages/painel/PainelSituacao'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
