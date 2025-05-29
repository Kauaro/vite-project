import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../App.jsx';
import Login from "./paginas/Login/login.jsx"
import Cadastro from "./paginas/Login/cadastro.jsx"
import RecuperarSenha from './paginas/Login/RecuperarSenha.jsx'
import LoginAdm from './paginas/LoginAdm/Login.jsx'


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path='/loginadm' element={<LoginAdm />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
