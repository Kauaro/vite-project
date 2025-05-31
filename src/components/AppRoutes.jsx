import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/Home.jsx';
import Login from "./paginas/Login/login.jsx"

import HomeAdm from './paginas/HomeAdm/HomeAdm.jsx'

import ForgotPass from "./paginas/LoginAdm/ForgotPass"
import LoginAdm from "./paginas/LoginAdm/Login"

import Mensagem from "./paginas/Mensagem/Mensagem"
import MensagemLer from "./paginas/Mensagem/MensagemLer"

import Usuario from "./paginas/Usuario/Usuario"
import UsuarioEditar from "./paginas/Usuario/UsuarioEditar"
import UsuarioNovo from "./paginas/Usuario/UsuarioNovo"
import UsuariosLista from "./paginas/Usuario/UsuariosLista"

import Projeto from "./paginas/ProjetosAdm/Projeto"
import ProjetoEditar from "./paginas/ProjetosAdm/ProjetoEditar"
import ProjetoNovo from "./paginas/ProjetosAdm/ProjetoNovo"
import ProjetosLista from "./paginas/ProjetosAdm/ProjetosLista"


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Login />} />

        <Route path="/homeadm" element={<HomeAdm />} />

        <Route path="/loginadm" element={<LoginAdm />} />
        <Route path="/forgotpass" element={<ForgotPass />} />

        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/mensagemler" element={<MensagemLer />} />

        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

        <Route path="/projeto" element={<Projeto />} />
        <Route path="/projetoslista" element={<ProjetosLista />} />
        <Route path="/projetonovo" element={<ProjetoNovo />} />
        <Route path="/projetoeditar/:id" element={<ProjetoEditar />} />


      </Routes>
    </Router>
  );
}

export default AppRoutes;
