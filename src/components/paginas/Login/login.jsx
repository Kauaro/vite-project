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
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!matricula.trim()) {
      newErrors.matricula = 'Matrícula é obrigatória';
    } else if (matricula.trim().length < 3) {
      newErrors.matricula = 'Matrícula deve ter pelo menos 3 caracteres';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.trim().length < 4) {
      newErrors.password = 'Senha deve ter pelo menos 4 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (field === 'matricula') {
      setMatricula(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="login">
      <img src={loginBg} alt="Login background" className="login__bg" />

      <form className="login__form" onSubmit={handleSubmit}>
        <img src={logo} className="logo" alt="Logo" />
        
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Acesso ao Sistema
        </h2>
        
        <div className="login__inputs">
          <div className="login__box">
            <label htmlFor="matricula">
              <input
                id="matricula"
                type="text"
                value={matricula}
                onChange={(e) => handleInputChange('matricula', e.target.value)}
                placeholder="Digite sua matrícula"
                required
                className={`login__input ${errors.matricula ? 'error' : ''}`}
              />
            </label>
            <i className="ri-mail-fill"></i>
            {errors.matricula && (
              <span className="error-message">{errors.matricula}</span>
            )}
          </div>

          <div className="login__box">
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Digite sua senha"
                required
                className={`login__input ${errors.password ? 'error' : ''}`}
              />
            </label>
            <i className="ri-lock-2-fill"></i>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
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
          {loading ? (
            <span className="loading-text">
              <span className="loading-spinner"></span>
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </button>
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
