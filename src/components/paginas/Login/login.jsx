import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Certifique-se de que o caminho está correto
import loginBg from '../../img/login-bg.png'; // Ajuste o caminho se necessário
import logo from '../../img/logo.png'
import userIcon from "../../img/user.png";


const Login = () => {
  return (
    <div className="login">
      <img src={loginBg} alt="Login background" className="login__bg" />

      <form className="login__form" onSubmit={(e) => e.preventDefault()}>
        <img src={logo} className="logo" />
        

        <div className="login__inputs">
          <div className="login__box">
            <input type="email" placeholder="Matricula" required className="login__input" />
            <i className="ri-mail-fill"></i>
          </div>

          <div className="login__box">
            <input type="password" placeholder="Senha" required className="login__input" />
            <i className="ri-lock-2-fill"></i>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input type="checkbox" className="login__check-input" id="user-check" />
            <label htmlFor="user-check" className="login__check-label">
              Lembrar-me
            </label>
          </div>

          <a href="#" className="login__forgot">Esqueceu a senha?</a>
        </div>

        <Link to='/home'>
        <button type="submit" className="login__button">Login</button>
        </Link>
        

      </form>
      <div id="bubble">
        <Link to='/loginadm'>
          <img src={userIcon} alt="administrador" title="administrador" />
          </Link>
        </div>
    </div>
    
  );
};

export default Login;
