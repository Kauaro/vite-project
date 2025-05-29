import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({imgProfile, username}) => {
    return(
        <div className="sidebar">
            <div className="m-1">
                <img src={imgProfile} alt="" className="img-fluid" width={40} />
                <span className="fw-bold ms-1">{username}</span>
            </div>
            <nav className="nav flex-column">
                <Link to={'/home'} className="nav-link" aria-current="page">Home</Link>
                <Link to={'/mensagem'} className="nav-link">Mensagem</Link>
                <Link to={'/produto'} className="nav-link">Produto</Link>
                <Link to={'/promocao'} className="nav-link">Promoção</Link>
                <Link to={'/usuario'} className="nav-link">Usuário</Link>
            </nav>
        </div>
    )
}

export default Sidebar;