import { FaDoorOpen, FaUser, FaSignOutAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './navbar.css';
import Logo from '../../img/logo.png';
import Sair from '../../img/sair.png';

function NavBar() {
  const { user, logout, isAluno, isProfessor, isAdministrador } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='NavBar'>
      <div className="header" id="header">
        <nav className="nav container">
          <Link to="/" className="nav__logo">
            <img src={Logo} alt="Logo" id='imgLogo' />
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>

              {/* Menu específico para Alunos */}
              {isAluno() && (
                <>
                  <li className="nav__item">
                    <Link to="/projetoslista" className="nav__link">Meus Projetos</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/avaliacoes" className="nav__link">Avaliações</Link>
                  </li>
                </>
              )}

              {/* Menu específico para Professores */}
              {isProfessor() && (
                <>
                  <li className="nav__item">
                    <Link to="/projetoslista" className="nav__link">Meus Projetos</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/projetonovo" className="nav__link">Novo Projeto</Link>
                  </li>
                </>
              )}

              {/* Menu específico para Administradores */}
              {isAdministrador() && (
                <>
                  <li className="nav__item">
                    <Link to="/usuarioslista" className="nav__link">Usuários</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/projetoslista" className="nav__link">Projetos</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/usuarionovo" className="nav__link">Novo Usuário</Link>
                  </li>
                </>
              )}

              <li className="nav__item">
                <Link to="/mensagem" className="nav__link">Mensagens</Link>
              </li>

              <li className="nav__item">
                <a href='https://fieb.edu.br' target="_blank" rel="noopener noreferrer" className="nav__link">FIEB</a>
              </li>
            </ul>
          </div>

          <div className="nav__actions">
            {/* Informações do usuário */}
            <div className="user-info" onClick={() => setShowUserMenu(!showUserMenu)}>
              <FaUser className="user-icon" />
              <span className="user-name">{user?.name}</span>
              <span className="user-role">
                {isAluno() && "🎓"}
                {isProfessor() && "👨‍🏫"}
                {isAdministrador() && "⚙️"}
              </span>
            </div>

            {/* Menu do usuário */}
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-header">
                  <strong>{user?.name}</strong>
                  <span className="user-role-text">
                    {isAluno() && "Aluno"}
                    {isProfessor() && "Professor"}
                    {isAdministrador() && "Administrador"}
                  </span>
                </div>
                <div className="user-menu-item" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Sair</span>
                </div>
              </div>
            )}

            {/* Botão de logout antigo (mantido para compatibilidade) */}
            <Link to="/login" onClick={handleLogout}>
              <img src={Sair} id="login-btn" alt="Sair" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
