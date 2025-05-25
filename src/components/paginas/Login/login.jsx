import React from "react";
import { Link } from 'react-router-dom';
import "./css/style.css";
import "./css/media.css";
import loginImg from "../../img/login.png";
import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import twitter from "../../img/twitter.png";
import github from "../../img/github.png";
import NavBar from '../../layout/navbar/navbar.jsx'


function Login() {

  
  return (
    
    <div className="body" >
    <NavBar />
    <div id="container">
      
      <div className="banner">
        <img src={loginImg} alt="imagem-login" />
        <p style={{ color: "#fff", fontWeight: 400 }}>
          Seja bem vindo, acesse e aproveite todo o conteúdo,
          <br /> somos uma equipe de profissionais empenhados em
          <br /> trazer o melhor conteúdo direcionado a você, usuário.
        </p>
      </div>

      <div className="box-login">
        <h1>
          Olá!
          <br />
          Seja bem vindo de volta.
        </h1>

        <div className="box">
          <h2>ENTRAR</h2>
          <input type="text" className="inputlogin" placeholder="RM" />
          <input type="password" className="inputlogin" placeholder="Senha" />

           <Link to="/recuperarsenha"> <p>Esqueceu a sua senha?</p> </Link>

          <button>Login</button>

           <Link to="/cadastro"> <p>Criar uma conta</p></Link>

          <div className="social">
            <img src={facebook} alt="facebook" />
            <img src={google} alt="google" />
            <img src={twitter} alt="twitter" />
            <img src={github} alt="github" />
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
