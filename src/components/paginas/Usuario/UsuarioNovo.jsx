import Header from "../../layout/Header/Header";
import Sidebar from '../../layout/Menu/Sidebar';
import logo from '../../img/logo.png';
import './css/UsuarioNovo.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService"; // Certifique-se de que este arquivo existe e tem o método createUsuario

const UsuarioNovo = () => {
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoUsuario = {
            nome,
            matricula,
            email,
            senha,
            nivelAcesso,
        };

        try {
            await UsuarioService.createUsuario(novoUsuario);
            alert("Usuário cadastrado com sucesso!");
            navigate("/usuariolista"); // Redireciona para a lista após cadastrar
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário!");
        }
    };

    return (
        <div className="usuario-novo-container">
            <Sidebar />
            <div className="usuario-novo-content">
                
                <section className="usuario-novo-section">
                    <form className="form-grid" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMatricula">Matricula</label>
                            <input type="number" id="inputMatricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSenha">Senha</label>
                            <input type="password" id="inputSenha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className="form-group small">
                            <label htmlFor="inputAcesso">Acesso</label>
                            <select id="inputAcesso" value={nivelAcesso} onChange={(e) => setNivelAcesso(e.target.value)}>
                                <option value="">Nível de Acesso</option>
                                <option>Aluno Projeto</option>
                                <option>Professor</option>
                                <option>Administrador</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn primary">Gravar</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioNovo;
