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
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
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
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${identificador}`, {
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
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Usuario');
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
                    <div className="quick-access-wrapper">
                      <div className="quick-access">
                        <h3>Acesso Rápido</h3>
                        <div className="cards-container">
                          
                          {/* Cards para Alunos */}
                          {isAluno() && (
                            <>
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                              </Link>
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
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                              </Link>
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
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                              </Link>
                              <Link to="/usuarioslista" className="access-card">
                                <div className="card-icon">👥</div>
                                <h4>Usuários</h4>
                                <p>Gerenciar alunos, professores e administradores</p>
                              </Link>
                              <Link to="/alunoslista" className="access-card">
                                <div className="card-icon">📱</div>
                                <h4>Alunos</h4>
                                <p>Gerenciar lista de alunos</p>
                              </Link>
                              <Link to="/projetoslista" className="access-card">
                                <div className="card-icon">📊</div>
                                <h4>Projetos</h4>
                                <p>Visualizar e gerenciar todos os projetos</p>
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
                    {/* Header com estatísticas */}
                    <div className="stats-header">
                        <div className="stats-card">
                            <div className="stats-icon">👥</div>
                            <div className="stats-info">
                                <span className="stats-number">{usuario.length}</span>
                                <span className="stats-label">Total de Usuários</span>
                            </div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon">🎓</div>
                            <div className="stats-info">
                                <span className="stats-number">{usuario.filter(u => u.nivelAcesso === 'aluno').length}</span>
                                <span className="stats-label">Alunos</span>
                            </div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon">👨‍🏫</div>
                            <div className="stats-info">
                                <span className="stats-number">{usuario.filter(u => u.nivelAcesso === 'professor').length}</span>
                                <span className="stats-label">Professores</span>
                            </div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon">⚙️</div>
                            <div className="stats-info">
                                <span className="stats-number">{usuario.filter(u => u.nivelAcesso === 'administrador').length}</span>
                                <span className="stats-label">Administradores</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabela moderna */}
                    <div className="table-wrapper">
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="th-content">
                                            <span>Matrícula</span>
                                            <div className="sort-icon">⇅</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            <span>Nome</span>
                                            <div className="sort-icon">⇅</div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            <span>Nível Acesso</span>
                                            <div className="sort-icon">⇅</div>
                                        </div>
                                    </th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuario.map((usuarioItem, index) => {
                                    const getRoleIcon = (role) => {
                                        switch(role) {
                                            case 'aluno': return '';
                                            case 'professor': return '';
                                            case 'administrador': return '';
                                            default: return '';
                                        }
                                    };

                                    const getRoleColor = (role) => {
                                        switch(role) {
                                            case 'aluno': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                                            case 'professor': return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
                                            case 'administrador': return 'linear-gradient(135deg, #413c3cff 0%, #5e5959ff 100%)';
                                            default: return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
                                        }
                                    };

                                    return (
                                        <tr key={usuarioItem.id || usuarioItem.matricula || index} className="table-row">
                                            <td>
                                                <div className="matricula-cell">
                                                    <span className="matricula-badge">{usuarioItem.matricula}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar">
                                                        <span>{usuarioItem.nome?.charAt(0)?.toUpperCase()}</span>
                                                    </div>
                                                    <span className="name-text">{usuarioItem.nome}</span>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="role-cell">
                                                    <span className="role-icon">{getRoleIcon(usuarioItem.nivelAcesso)}</span>
                                                    <span 
                                                        className="role-badge" 
                                                        style={{ background: getRoleColor(usuarioItem.nivelAcesso) }}
                                                    >
                                                        {usuarioItem.nivelAcesso}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button onClick={() => getId(usuarioItem.id, usuarioItem.matricula)} className="btn btn-edit">
                                                        <span className="btn-icon">📩</span>
                                                        <span className="btn-text">Abrir</span>
                                                    </button>
                                                    <button onClick={() => handleExcluir(usuarioItem.id, usuarioItem.matricula)} className="btn btn-delete">
                                                        <span className="btn-icon">🗑️</span>
                                                        <span className="btn-text">Excluir</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer com informações */}
                    <div className="table-footer">
                        <div className="footer-info">
                            <span>Mostrando {usuario.length} de {usuario.length} usuários</span>
                        </div>
                        <div className="footer-actions">
                            <button className="btn-refresh" onClick={fetchUsuarios}>
                                <span>🔄</span> Atualizar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UsuariosLista;
