import React from "react";
import "./css/style.css";
import "./css/media.css";
import loginImg from "../../img/login.png";
import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import twitter from "../../img/twitter.png";
import github from "../../img/github.png";

const Login = () => {
  return (
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
          <h2>faça o seu login agora</h2>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />

          <a href="/senha">
            <p>Esqueceu a sua senha?</p>
          </a>

          <button>Login</button>

          <a href="/cadastro">
            <p>Criar uma conta</p>
          </a>

          <div className="social">
            <img src={facebook} alt="facebook" />
            <img src={google} alt="google" />
            <img src={twitter} alt="twitter" />
            <img src={github} alt="github" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
