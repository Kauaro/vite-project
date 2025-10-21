import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './css/UsuarioNovo.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";

const UsuarioNovo = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");

    const navigate = useNavigate();

    /*const handleSubmit = async (e) => {
        e.preventDefault(); 
    */
        const [novoUsuario, setNovoUsuario] = useState({
            "nome": '',
            "matricula": '',
            "email": '',
            "senha": '',
            "nivelAcesso": ''
        });
        const [confirmarSenha, setConfirmarSenha] = useState('');

        const handleEditUsuario = (event, nome) => {
            setNovoUsuario({
                ...novoUsuario,
                [nome]: event.target.value,
            });
        };

        const handleUsuario = async (event) => {
        try {
            event.preventDefault();
            
            if (novoUsuario.senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });
            const json = await response.json();
            console.log(response.status);
            console.log(json);
            alert("Usuario cadastrado com sucesso!");
            navigate("/usuarioslista");
        } catch (error) {

        }
    };

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    return (

      <>

        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <Navbar />

        <div className="usuario-novo-container">
            
            
            
                   
            {/* Formulário de cadastro */}
            <div className="modern-form-container">
                <div className="form-header">
                    <div className="header-content">
                      
                        <h1 className="form-title">Novo Usuário</h1>
                        <p className="form-subtitle">Preencha os dados para cadastrar um novo usuário no sistema</p>
                    </div>
                </div>

                <div className="form-novo-content">
                    <form className="modern-form" onSubmit={handleUsuario}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="inputNome" className="field-label">Nome Completo</label>
                                <input 
                                    type="text" 
                                    id="inputNome" 
                                    className="field-input"
                                    placeholder="Digite o nome completo"
                                    value={novoUsuario.nome} 
                                    onChange={(e) => {handleEditUsuario(e, 'nome')}} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputMatricula" className="field-label">Matrícula</label>
                                <input 
                                    type="text" 
                                    id="inputMatricula" 
                                    className="field-input"
                                    placeholder="Digite a matrícula"
                                    value={novoUsuario.matricula} 
                                    onChange={(e) => {handleEditUsuario(e, 'matricula')}} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputEmail4" className="field-label">Email</label>
                                <input 
                                    type="email" 
                                    id="inputEmail4" 
                                    className="field-input"
                                    placeholder="Digite o email"
                                    value={novoUsuario.email} 
                                    onChange={(e) => {handleEditUsuario(e, 'email')}} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputSenha" className="field-label">Senha</label>
                                <input 
                                    type="password" 
                                    id="inputSenha" 
                                    className="field-input"
                                    placeholder="Digite a senha"
                                    value={novoUsuario.senha} 
                                    onChange={(e) => {handleEditUsuario(e, 'senha')}} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputConfirmarSenha" className="field-label">Confirmar Senha</label>
                                <input 
                                    type="password" 
                                    id="inputConfirmarSenha" 
                                    className={`field-input ${confirmarSenha && novoUsuario.senha !== confirmarSenha ? 'error' : ''}`}
                                    placeholder="Confirme a senha"
                                    value={confirmarSenha} 
                                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                                    required 
                                />
                                {confirmarSenha && novoUsuario.senha !== confirmarSenha && (
                                    <span className="error-message">As senhas não coincidem</span>
                                )}
                            </div>
                            
                            <div className="form-field full-width">
                                <label htmlFor="inputAcesso" className="field-label">Nível de Acesso</label>
                                <select 
                                    id="inputAcesso" 
                                    className="field-select"
                                    value={novoUsuario.nivelAcesso} 
                                    onChange={(e) => {handleEditUsuario(e, 'nivelAcesso')}} 
                                    required
                                >
                                    <option value="">Selecione o nível de acesso</option>
                                    <option value="aluno">Aluno</option>
                                    <option value="professor">Professor</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-novo-actions">
                            <button type="submit" className="btn-modern btn-primary-cadastro">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Cadastrar Usuário
                            </button>
                            <Link to="/usuarioslista" className="btn-modern btn-secondary-cadastro">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default UsuarioNovo;
