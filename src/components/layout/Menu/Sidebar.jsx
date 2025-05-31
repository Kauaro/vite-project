import { Link } from "react-router-dom";
import './Sidebar.css';
import logo from '../../img/logo.png';
import sair from '../../img/sair.png'

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="d-flex justify-content-around align-items-center px-2 py-4 border-bottom rounded">
                <img src={logo} alt="logo" className="logo" />
                <span className="fw-bold fst-italic"> CONTROLE</span>
            </div>

            <nav className="nav">
                <Link className="nav-link" aria-current="page" to={'/homeadm'}>Dashboard</Link>
                <Link className="nav-link" to={'/mensagem'}>Avaliações</Link>
                <Link className="nav-link" to={'/usuario'}>Usuários</Link>
                <Link className="nav-link" to={'/projeto'}>Projetos</Link>

            </nav>
            <Link to='/'>
            <img src={sair} alt="" className="sair"/>
            </Link>
        </div>
    )
}

export default Sidebar