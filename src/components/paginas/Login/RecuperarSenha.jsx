import React from 'react';
import { Link } from 'react-router-dom';
import "./css/style.css";
import "./css/media.css";
import loginImg from "../../img/login.png";
import userIcon from "../../img/user.png";

const RecuperarSenha = () => {
  return (
    <>
      <div id="container">
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
            <input type="text" placeholder="apelido" />
            <input type="email" placeholder="e-mail" />
            <input type="email" placeholder="confirmar o e-mail" />

            <p style={{ textAlign: "justify", padding: "0 30px" }}>
              Um código será enviado para a sua caixa de entrada, copie esse
              código e cole na próxima tela, certifique-se de que o seu apelido
              bem como o e-mail esteja corretos e que seja o mesmo da conta que
              você deseja recuperar
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
    </>
  );
};

export default RecuperarSenha;
