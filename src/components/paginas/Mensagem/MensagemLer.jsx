import { Link } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import './MensagemLer.css';

const MensagemLer = () => {
    return (
        <div className="mensagem-ler-container">
            <Sidebar />
            <div className="mensagem-ler-content">
                
                <section className="mensagem-ler-section">
                    <form className="mensagem-ler-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="inputID">ID:</label>
                                <input type="text" id="inputID" readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputData">Data:</label>
                                <input type="text" id="inputData" readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputStatus">Status:</label>
                                <input type="text" id="inputStatus" readOnly />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="inputEmissor">Emissor:</label>
                            <input type="text" id="inputEmissor" readOnly />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="inputEmail">Email:</label>
                            <input type="email" id="inputEmail" readOnly />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="inputTexto">Mensagem:</label>
                            <textarea id="inputTexto" rows="5" />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="btn-warning">Marcar como Lida</button>
                            <button type="submit" className="btn-danger">Inativar</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default MensagemLer;
