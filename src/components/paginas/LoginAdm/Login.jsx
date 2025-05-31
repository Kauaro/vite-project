import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { FaUserShield, FaKey } from 'react-icons/fa';
import cancelar from '../../img/cancelar.png'
import './login.css';

const AdminLogin = () => {
  return (
    <div className="admin-login-container">
        <Link to='/'>
        <img src={cancelar} alt="" className="cancelar"/>
        </Link>
      <form className="admin-login-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="admin-login-title">Área Administrativa</h2>

        <div className="admin-login-input-box">
          <label htmlFor="matricula">Matrícula</label>
          <div className="admin-login-input">
            <FaUserShield className="admin-login-icon" />
            <input
              type="text"
              id="matricula"
              name="matricula"
              placeholder="Digite sua matrícula"
              required
            />
          </div>
        </div>

        <div className="admin-login-input-box">
          <label htmlFor="senha">Senha</label>
          <div className="admin-login-input">
            <FaKey className="admin-login-icon" />
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>
        </div>
        
        <Link to='/homeadm'>
        <button type="submit" className="admin-login-button">
          Entrar
        </button>
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
