import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import Header from './components/Header'
import CadastroPaciente from './pages/cadastro/CadastroPaciente'

function App() {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro' element={<CadastroPaciente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
