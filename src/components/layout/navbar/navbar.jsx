import { FaDoorOpen } from 'react-icons/fa'; // Ícones do FontAwesome
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logo from '../../img/logo.png';
import Sair from '../../img/sair.png';


function NavBar() {
  return (
    <div className='NavBar'>
      
      <div className="header" id="header">
        <nav className="nav container">
          <Link to="/" className="nav__logo">
            <img src={Logo} alt="" id='imgLogo' />
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>

              <li className="nav__item">
                <Link to="/sobrenos" className="nav__link"> Meu Projeto</Link>
              </li>

              <li className="nav__item">
                <Link to="/services" className="nav__link">Avaliações</Link>
              </li>
              

              <li className="nav__item">
                <a href='fieb.edu.br' className="nav__link">FIEB</a>
              </li>
            </ul>

          </div>

          <div className="nav__actions">
            <Link to="/">
            <img src={Sair} id="login-btn" />
            </Link>

          </div>
        </nav>
      </div>


    </div>
  );
}

export default NavBar;
