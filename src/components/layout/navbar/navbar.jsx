import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logo from '../../img/logo.png';
import LoginLogo from '../../img/login-cadastro.png';


function NavBar() {
  return (
    <div className='NavBar'>
      <div className="header" id="header">
        <nav className="nav container">
          <Link to="/home" className="nav__logo">
            <img src={Logo} alt="" id='imgLogo' />
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/home" className="nav__link">Home</Link>
              </li>

              <li className="nav__item">
                <Link to="/sobrenos" className="nav__link">Sobre Nós</Link>
              </li>

              <li className="nav__item">
                <Link to="/services" className="nav__link">Projetos</Link>
              </li>

              <li className="nav__item">
                <a href='fieb.edu.br' className="nav__link">FIEB</a>
              </li>
            </ul>

          </div>

          <div className="nav__actions">
            <Link to="/login">
            <img src={LoginLogo} id="login-btn" />
            </Link>

          </div>
        </nav>
      </div>


    </div>
  );
}

export default NavBar;
