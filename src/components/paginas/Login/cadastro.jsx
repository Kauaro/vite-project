import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/style.css";
import "./css/media.css";
import loginImg from "../../img/login.png";
import userIcon from "../../img/user.png";
import NavBar from '../../layout/navbar/navbar.jsx';


const Cadastro = () => {
  const [showTermos, setShowTermos] = useState(false);

  return (
    <div className='body'>
      <div id="container" >
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
            Junte-se a nós,
            <br />
            Crie hoje a sua conta!
          </h1>

          <div className="box-account">
            <h2>informe seus dados</h2>
            <input type="text" className='inputcadastro' placeholder="nome" />
            <input type="text"className='inputcadastro' placeholder="rm " />
            <input type="email" className='inputcadastro' placeholder="e-mail" />
            <input type="password" className='inputcadastro' placeholder="senha" />
            <input type="password" className='inputcadastro' placeholder="confirmar a senha" />

            <div className="check">
              <input
                type="checkbox"
                style={{ width: 13, height: 13 }}
                onClick={() => setShowTermos(true)}
              />
              <label style={{ color: "#3d3d3d" }}>li e aceito os termos</label>
            </div>

            <button>Criar conta</button>
          </div>
        </div>
      </div>

      <a href="/">
        <div id="bubble">
          <img src={userIcon} alt="administrador" title="administrador" />
        </div>
      </a>

      {showTermos && (
        <div
          className="termo"
          style={{
            position: "absolute",
            width: "65%",
            height: 420,
            borderRadius: 10,
            background: "#fff",
            color: "#3d3d3d",
            boxShadow: "0px 0px 6px -1px #000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          Eu entendo e aceito os termos impostos pela plataforma...
          <button onClick={() => setShowTermos(false)}>Ok</button>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
