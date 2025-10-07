import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import loginBg from '../../img/login-bg.png';
import logo from '../../img/logo.png';
import userIcon from "../../img/user.png";

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  // Função para exibir toast
  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Validação simples
  const validateForm = () => {
    const newErrors = {};
    
    if (!matricula.trim()) {
      newErrors.matricula = 'Matrícula é obrigatória';
    } else if (matricula.trim().length < 3) {
      newErrors.matricula = 'Matrícula deve ter pelo menos 3 caracteres';
    }
    
    if (!senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (senha.trim().length < 4) {
      newErrors.senha = 'Senha deve ter pelo menos 4 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await login(matricula, senha);

      if (result.success) {
        showToastMessage(result.message || 'Login realizado com sucesso!');
        // Redireciona após 1s
        setTimeout(() => navigate('/home'), 1000);
      } else {
        showToastMessage(result.message || 'Matrícula ou senha incorretos.', 'error');
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

    if (field === 'matricula') setMatricula(value);
    else if (field === 'senha') setSenha(value);
  };

  

  return (
    <div className="login">
      <img src={loginBg} alt="Login background" className="login__bg" />

      <form className="login__form" onSubmit={handleSubmit}>
        <img src={logo} className="logo" alt="Logo" />

        <div className="login__inputs">
          <div className="login__box">
            <input
              id="matricula"
              type="text"
              value={matricula}
              onChange={(e) => handleInputChange('matricula', e.target.value)}
              placeholder="Digite sua matrícula"
              className={`login__input ${errors.matricula ? 'error' : ''}`}
            />
            {errors.matricula && <span className="error-message">{errors.matricula}</span>}
          </div>

          <div className="login__box">
            <input
              id="password"
              type="password"
              value={senha}
              onChange={(e) => handleInputChange('senha', e.target.value)}
              placeholder="Digite sua senha"
              className={`login__input ${errors.senha ? 'error' : ''}`}
            />
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input type="checkbox" id="user-check" className="login__check-input" />
            <label htmlFor="user-check" className="login__check-label">Lembrar-me</label>
          </div>
          <a href="#" className="login__forgot">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="login__button" disabled={loading}> 
          {loading ? (
            <span className="loading-text">
              <span className="loading-spinner"></span>
              Entrando...
            </span>
          ) : "Entrar"}
        </button>
      </form>

      {/* Toast */}
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
