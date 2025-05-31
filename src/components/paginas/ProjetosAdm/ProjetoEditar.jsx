import { useParams } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import { useEffect, useRef, useState } from "react";
import './css/UsuarioEditar.css';

const UsuarioEditar = () => {
    const { id } = useParams();
    const _dbRecords = useRef(true);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        // Simulação de requisição
        UsuarioService.getById(id).then((response) => {
            setUsuario(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <div className="usuario-editar-container">
            <Sidebar />
            <div className="usuario-editar-content">
                
                <section className="usuario-editar-section">
                    <form className="form-grid">
                        <div className="form-group">
                            <label htmlFor="inputID">ID</label>
                            <input type="text" id="inputID" value={usuario.id || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" value={usuario.nome || ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" id="inputEmail4" value={usuario.email || ''} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputData">Data de Cadastro</label>
                            <input type="text" id="inputData" value={usuario.dataCadastro || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputStatus">Status</label>
                            <input type="text" id="inputStatus" value={usuario.statusUsuario || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAcesso">Acesso</label>
                            <select id="inputAcesso">
                                <option defaultValue>Nível de Acesso</option>
                                <option>...</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn primary">Gravar Alterações</button>
                            <button type="button" className="btn warning">Reativar / Resetar a Senha</button>
                            <button type="button" className="btn danger">Inativar Conta</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioEditar;
