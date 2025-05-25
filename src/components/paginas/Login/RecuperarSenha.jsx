import React from 'react';
import { Link } from 'react-router-dom';
import "./css/style.css";
import "./css/media.css";
import loginImg from "../../img/login.png";
import userIcon from "../../img/user.png";
import NavBar from '../../layout/navbar/navbar.jsx';

const RecuperarSenha = () => {
  return (
        <div className='body'>
      <div id="container">
        <NavBar />
        <div className="banner">
          <img src={loginImg} alt="imagem-login" />
          <p style={{ color: "#fff" }}>
            Seja bem vindo, acesse e aproveite todo o conteúdo,
            <br /> somos uma equipe de profissionais empenhados em
            <br /> trazer o melhor conteúdo direcionado a você usuário.
          </p>
        </div>

        <div className="box-login">
          <h1>
            Perdeu a sua senha?
            <br />
            recupere via email agora
          </h1>

          <div className="box-account">
            <h2>insira a sua conta existente</h2>
            <input type="text" className='inputcadastro' placeholder="rm" />
            <input type="email" className='inputcadastro' placeholder="e-mail" />
            <input type="email" className='inputcadastro' placeholder="confirmar o e-mail" />

            <p style={{ textAlign: "center", padding: "0 50px" }}>
              Um código será enviado ao seu email. <br />
              Confirme seu rm e seu email
            </p>

            <button>Obter o código</button>
          </div>
        </div>
      </div>

      <a href="/">
        <div id="bubble">
          <img src={userIcon} alt="icone-usuário" title="fazer-login" />
        </div>
      </a>
    </div>
  );
};

export default RecuperarSenha;
