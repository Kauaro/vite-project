import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/UsuariosLista.css';
import UsuarioService from "../../services/UsuarioService";

const UsuariosLista = () => {
    const { isUser, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // O redirecionamento será feito automaticamente pelo ProtectedRoute
    };

    const getId = (id, matricula) => {
        const identificador = id || matricula;
        if (identificador) {
            navigate(`/usuarioeditar/${identificador}`);
        } else {
            alert('Erro: Não foi possível identificar o usuário para edição.');
        }
    };

    const [usuario, setUsuario] = useState([]);

    // Função para excluir usuário
    const handleExcluir = async (id, matricula) => {
        console.log('Tentando excluir usuário com ID:', id, 'Matrícula:', matricula); // Debug
        
        // Usa matricula se id não estiver disponível
        const identificador = id || matricula;
        
        if (!identificador) {
            alert('Erro: Não foi possível identificar o usuário para exclusão.');
            return;
        }
        
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/Usuario/${identificador}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    alert("Usuário excluído com sucesso!");
                    // Atualiza a lista de usuários sem recarregar a página
                    fetchUsuarios();
                } else {
                    alert("Erro ao excluir usuário. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
                alert("Erro ao excluir usuário. Tente novamente.");
            }
        }
    };

    // Função para buscar usuários
    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/Usuario');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setUsuario(data);
            } else {
                const usuarios = data.usuario || [];
                setUsuario(usuarios);
            }
        } catch (error) {
            console.log('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
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

                <section className="usuario-section-tabela">
                    <div className="table-wrapper">
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>Matricula</th>
                                    <th>Nome</th>
                                    <th>Nivel Acesso</th>
                                    <th>Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuario.map((usuarioItem, index) => {
                                    return (
                                        <tr key={usuarioItem.id || usuarioItem.matricula || index}>
                                            <td>{usuarioItem.matricula}</td>
                                            <td>{usuarioItem.nome}</td> 
                                            <td>{usuarioItem.nivelAcesso}</td>
                                            <td>
                                                <button onClick={() => getId(usuarioItem.id, usuarioItem.matricula)} className="btn warning">
                                                📩 Abrir
                                            </button>
                                                <button onClick={() => handleExcluir(usuarioItem.id, usuarioItem.matricula)} className="btn danger">
                                                    🗑️ Excluir</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UsuariosLista;
