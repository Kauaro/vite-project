import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../App.jsx';
import Login from "./paginas/Login/login.jsx"
import Cadastro from "./paginas/Login/cadastro.jsx"
import RecuperarSenha from './paginas/Login/RecuperarSenha.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/featured" element={<h1>Featured</h1>} />
        <Route path="/contact" element={<h1>Contact Me</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
