import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import { useEffect, useState } from "react";
import './css/UsuariosLista.css';
import UsuarioService from "../../services/UsuarioService";

const UsuariosLista = () => {
    const navigate = useNavigate();

    const getId = (id) => {
        navigate(`/usuarioeditar/${id}`);
    };

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        UsuarioService.getAllUsuarios()
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="usuarios-lista-container">
            <Sidebar />
            <div className="usuarios-lista-content">
                
                <section className="usuarios-lista-section">
                    <div className="table-wrapper">
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Acesso</th>
                                    <th>Cadastro</th>
                                    <th>Status</th>
                                    <th>Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios?.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.nivelAcesso}</td>
                                        <td>{usuario.dataCadastro}</td>
                                        <td>{usuario.statusUsuario}</td>
                                        <td>
                                            <button onClick={() => getId(usuario.id)} className="btn warning">
                                                📩 Abrir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UsuariosLista;
