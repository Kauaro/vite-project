import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './css/UsuarioNovo.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";

const UsuarioNovo = () => {
    const { user, isAluno, isProfessor, isAdministrador } = useAuth();
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
            navigate("/usuarioslista");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário!");
        }
    };

    const handleLogout = () => {
        logout();
        // O redirecionamento será feito automaticamente pelo ProtectedRoute
    };

    return (
        <div className="usuario-container">
            {/* Botão de sair no canto superior direito */}
            <div className="logout-top-right">
                <button onClick={handleLogout} className="logout-button-top">
                    <span className="logout-icon">🚪</span>
                    Sair
                </button>
            </div>

            {/* Seção de boas-vindas personalizada */}
            <div className="section-usuario">
                <h2>CADASTRO DE NOVO USUÁRIO</h2>
                <p className="user-role">
                    {isAluno() && "🎓 Aluno"}
                    {isProfessor() && "👨‍🏫 Professor"}
                    {isAdministrador() && "⚙️ Administrador"}
                </p>
            </div>

            {/* Cards de acesso rápido baseados no tipo de usuário */}
            <div className="card-acesso-usuario">
                <div className="quick-access">
                    <h3>Acesso Rápido</h3>
                    <div className="cards-container">

                        {isAluno() && (
                            <>
                                <Link to="/projetoslista" className="access-card">
                                    <div className="card-icon">📋</div>
                                    <h4>Meus Projetos</h4>
                                    <p>Visualizar projetos que participo</p>
                                </Link>
                                <Link to="/avaliacoes" className="access-card">
                                    <div className="card-icon">📊</div>
                                    <h4>Minhas Avaliações</h4>
                                    <p>Ver notas e comentários dos projetos</p>
                                </Link>
                                <Link to="/mensagem" className="access-card">
                                    <div className="card-icon">💬</div>
                                    <h4>Mensagens</h4>
                                    <p>Ver mensagens e comunicações</p>
                                </Link>
                            </>
                        )}

                        {isProfessor() && (
                            <>
                                <Link to="/projetoslista" className="access-card">
                                    <div className="card-icon">📋</div>
                                    <h4>Meus Projetos</h4>
                                    <p>Gerenciar projetos que administro</p>
                                </Link>
                                <Link to="/projetonovo" className="access-card">
                                    <div className="card-icon">➕</div>
                                    <h4>Novo Projeto</h4>
                                    <p>Criar um novo projeto</p>
                                </Link>
                                <Link to="/mensagem" className="access-card">
                                    <div className="card-icon">💬</div>
                                    <h4>Mensagens</h4>
                                    <p>Ver mensagens e comunicações</p>
                                </Link>
                            </>
                        )}

                        {isAdministrador() && (
                            <>
                                <Link to="/usuarioslista" className="access-card">
                                    <div className="card-icon">👥</div>
                                    <h4>Usuários</h4>
                                    <p>Gerenciar alunos, professores e administradores</p>
                                </Link>
                                <Link to="/usuarionovo" className="access-card">
                                    <div className="card-icon">➕</div>
                                    <h4>Novo Usuário</h4>
                                    <p>Cadastrar novo usuário</p>
                                </Link>
                                
                                <Link to="/projetonovo" className="access-card">
                                    <div className="card-icon">➕</div>
                                    <h4>Novo Projeto</h4>
                                    <p>Criar um novo projeto</p>
                                </Link>
                               

                                <Link to="/projetoslista" className="access-card">
                                    <div className="card-icon">📋</div>
                                    <h4>Todos os Projetos</h4>
                                    <p>Visualizar e gerenciar todos os projetos</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Formulário de cadastro */}
            <div className="usuario-content">

                <div className="breadcrumb-navigator">
                    <div className="breadcrumb-item-container">
                        <Link to="/usuario" className="navegador-usuario-item">Usuário</Link>
                    </div>
                    <div className="breadcrumb-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="breadcrumb-item-container">
                        <Link to="/usuarioslista" className="navegador-usuario-item">Lista Usuário</Link>
                    </div>
                    <div className="breadcrumb-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="breadcrumb-item-container">
                        <span className="navegador-usuario-item active">Novo Usuário</span>
                    </div>
                </div>

                <section className="usuario-section">
                    <form className="form-grid" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMatricula">Matrícula</label>
                            <input type="text" id="inputMatricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSenha">Senha</label>
                            <input type="password" id="inputSenha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAcesso">Nível de Acesso</label>
                            <select id="inputAcesso" value={nivelAcesso} onChange={(e) => setNivelAcesso(e.target.value)} required>
                                <option value="">Selecione o nível de acesso</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn primary">Cadastrar Usuário</button>
                            <Link to="/usuarioslista" className="btn secondary">Cancelar</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioNovo;
