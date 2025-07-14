import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import loginBg from '../../img/login-bg.png';
import logo from '../../img/logo.png';
import userIcon from "../../img/user.png";

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(matricula, password);
      if (success) {
        showToastMessage('Login realizado com sucesso! Bem-vindo ao sistema.');
        // Redirecionar baseado no tipo de usuário
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        showToastMessage('Matrícula ou senha incorretos.', 'error');
      }
    } catch (error) {
      showToastMessage('Ocorreu um erro durante o login.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <img src={loginBg} alt="Login background" className="login__bg" />

      <form className="login__form" onSubmit={handleSubmit}>
        <img src={logo} className="logo" alt="Logo" />
        
        <div className="login__inputs">
          <div className="login__box">
            <label htmlFor="matricula">Matrícula</label>
            <input
              id="matricula"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Digite sua matrícula"
              required
              className="login__input"
            />
            <i className="ri-mail-fill"></i>
          </div>

          <div className="login__box">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              className="login__input"
            />
            <i className="ri-lock-2-fill"></i>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input type="checkbox" id="user-check" className="login__check-input" />
            <label htmlFor="user-check" className="login__check-label">
              Lembrar-me
            </label>
          </div>

          <a href="#" className="login__forgot">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="login__button" disabled={loading}> 
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Informações de teste */}
        <div className="login__test-info">
          <h4>Usuários para teste:</h4>
          <p><strong>Aluno:</strong> Matrícula: 2024001, Senha: 123456</p>
          <p><strong>Professor:</strong> Matrícula: PROF001, Senha: 123456</p>
          <p><strong>Administrador:</strong> Matrícula: ADMIN001, Senha: 123456</p>
        </div>
      </form>

      {/* Toast de notificação */}
      {showToast && (
        <div className={`toast ${toastType}`}>
          {toastMessage}
        </div>
      )}

      <div id="bubble">
        <Link to='/loginadm'>
          <img src={userIcon} alt="administrador" title="administrador" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
