import { Link } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import './css/Usuario.css';

const Usuario = () => {
    return (
        <div className="usuario-container">
            <Sidebar />
            <div className="usuario-content">
                
                <section className="usuario-section">
                    <div className="usuario-actions">
                        <Link to="/usuarionovo" className="btn btn-primary">
                            Novo Usuário
                        </Link>
                        <Link to="/usuarioslista" className="btn btn-warning">
                            Lista de Usuários
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Usuario;
