import { Link, useNavigate } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import './Mensagem.css'; // CSS personalizado

const Mensagem = () => {
    const navigate = useNavigate();

    const goTo = () => {
        navigate('/mensagemler');
    };

    const getId = (id) => {
        console.log("ID:", id);
    };

    return (
        <div className="mensagem-container">
            <Sidebar />
            <div className="mensagem-content">
                
                <section className="mensagem-section">
                    <div className="mensagem-table-wrapper">
                        <table className="mensagem-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Emissor</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => goTo()}
                                            className="mensagem-btn"
                                        >
                                            📩 Abrir
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Mensagem;
