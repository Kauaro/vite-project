import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/UsuariosLista.css';
import UsuarioService from "../../services/UsuarioService";

const UsuariosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // O redirecionamento será feito automaticamente pelo ProtectedRoute
    };

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
                <h2>LISTA DE USUÁRIOS</h2>
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
                        
                        {/* Cards para Alunos */}
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

                        {/* Cards para Professores */}
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

                        {/* Cards para Administradores */}
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
                                <Link to="/projetoslista" className="access-card">
                                    <div className="card-icon">📋</div>
                                    <h4>Todos os Projetos</h4>
                                    <p>Visualizar e gerenciar todos os projetos</p>
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
                    </div>
                </div>
            </div>

            {/* Tabela de usuários */}
            <div className="usuario-content">
                {/* Navegador Breadcrumb */}
                <div className="navegador-usuarios">
                    <div className="navegador-item-container">
                        <Link to="/usuario" className="navegador-item">Usuário</Link>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <span className="navegador-item active">Lista Usuário</span>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <Link to="/usuarionovo" className="navegador-item">Novo Usuário</Link>
                    </div>
                </div>

                <section className="usuario-section">
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
