import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import './css/projetolista.css';

const ProjetosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout, canEditProject } = useAuth();
    const navigate = useNavigate();
    const [projeto, setProjeto] = useState([]);

        const usuario = JSON.parse(localStorage.getItem("usuario"));


    // Função para buscar usuários
    const fetchProjeto = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Projeto');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setProjeto(data);
            } else {
                const projeto = data.projeto || [];
                setProjeto(projeto);
            }
        } catch (error) {
            console.log('Erro ao buscar projetos:', error);
        }
    };

    useEffect(() => {
        fetchProjeto();
    }, []);

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};
    const handleEditar = (id) => {
        navigate(`/projetoeditar/${id}`);
    };

    const handleAvalia = (id) => {
        navigate(`/avaliacoes/${id}`);
    };

    const handleCadastrar = (id) => {
        navigate(`/${usuario.id}`);
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await ProjetoService.deleteProjeto(id);
                setProjeto(projeto.filter(p => p.id !== id));
            } catch (error) {
                console.error('Erro ao excluir projeto:', error);
                alert('Erro ao excluir projeto. Tente novamente.');
            }
        }
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
            <div className="welcome-section">
                <h2>Lista de Projetos</h2>
                <p className="user-role">
                    {isAluno() && "🎓 Aluno"}
                    {isProfessor() && "👨🏫 Professor"}
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

            {/* Tabela de projetos */}
            <div className="projeto-content">
                {/* Navegador Breadcrumb */}
                <div className="navegador-projetos">
                    <div className="navegador-item-container">
                        <span className="navegador-item active">Projetos</span>
                    </div>
                    <div className="navegador-separator-container">
                        {(isProfessor() || isAdministrador()) && (
                            <span className="navegador-separator">/</span>
                        )}
                    </div>
                    <div className="navegador-item-container">
                        {(isProfessor() || isAdministrador()) && (
                            <button onClick={() => handleCadastrar(projeto.id)} className="navegador-item-button">Novo Projeto</button>
                        )}
                    </div>
                </div>

                <section className="projeto-section">
                    {/* Header com estatísticas */}
                    <div className="stats-header">
                        <div className="stats-card">
                            <div className="stats-icon">📊</div>
                            <div className="stats-info">
                                <span className="stats-number">{projeto.length}</span>
                                <span className="stats-label">Total de Projetos</span>
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
                                    Titulo
                                </div>
                            </th>
                            <th>
                                <div className="th-content">
                                    Tema
                                </div>
                            </th>
                            <th>
                                <div className="th-content">
                                    Responsável
                                </div>
                            </th>
                            {(isProfessor() || isAdministrador() || isAluno()) && (
                                <th>
                                    <div className="th-content">
                                        Ações
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {projeto?.map((projeto) => (
                            <tr key={projeto.id} className="table-row">
                                <td>
                                    <div className="name-cell">
                                        <span className="name-text">{projeto.nome}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="role-cell">
                                        <span className="role-badge" style={{background: 'linear-gradient(135deg, #545c59ff 0%, #6c7c77ff 100%)'}}>
                                            {projeto.tema}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="name-cell">
                                        <span className="name-text">
                                        {projeto.usuarioNome}
                                        </span>
                                    </div>
                                </td>
                                {(isProfessor() || isAdministrador() || isAluno()) && (
                                    <td>
                                        <div className="actions-cell">
                                            {canEditProject(projeto.id) && (
                                                <>
                                                    <button onClick={() => handleEditar(projeto.id)} className="btn btn-edit">
                                                        <span className="btn-icon">📩</span>
                                                        <span className="btn-text">Abrir</span>
                                                    </button>
                                                    <button onClick={() => handleExcluir(projeto.id)} className="btn btn-delete">
                                                        <span className="btn-icon">🗑️</span>
                                                        <span className="btn-text">Excluir</span>
                                                    </button>
                                                </>
                                            )}
                                            <button onClick={() => handleAvalia(projeto.id)} className="btn" style={{background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white'}}>
                                                <span className="btn-icon">📊</span>
                                                <span className="btn-text">Avaliações</span>
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                    {/* Footer com informações */}
                    <div className="table-footer">
                        <div className="footer-info">
                            <span>Mostrando {projeto.length} de {projeto.length} projetos</span>
                        </div>
                        <div className="footer-actions">
                            <button className="btn-refresh" onClick={() => window.location.reload()}>
                                <span>🔄</span> Atualizar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjetosLista;