import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/AlunosLista.css';
import AlunoService from "../../services/AlunoService";

const AlunosLista = () => {
    const { isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState([]);

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    const handleEditar = (matricula) => {
        if (matricula) {
            navigate(`/alunoeditar/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno para edição.');
        }
    };

    const handleAvaliacoes = (matricula) => {
        if (matricula) {
            navigate(`/avaliacoesaluno/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno.');
        }
    };

    const handleExcluir = async (matricula) => {
        if (!matricula) {
            alert('Erro: Não foi possível identificar o aluno para exclusão.');
            return;
        }
        
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                await AlunoService.deleteAluno(matricula);
                alert("Aluno excluído com sucesso!");
                // Atualiza a lista de alunos sem recarregar a página
                fetchAluno();
            } catch (error) {
                console.error("Erro ao excluir aluno:", error);
                alert("Erro ao excluir aluno. Tente novamente.");
            }
        }
    };

    const fetchAluno = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Aluno');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setAluno(data);
            } else {
                const aluno = data.aluno || [];
                setAluno(aluno);
            }
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
        }
    };

    useEffect(() => {
        fetchAluno();
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
                <h2>LISTA DE ALUNOS</h2>
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

            {/* Tabela de alunos */}
            <div className="aluno-usuario-content">
                

                <section className="usuario-section-tabela">
                    {/* Header com estatísticas */}
                    <div className="stats-header">
                        <div className="stats-card">
                            <div className="stats-icon">🎓</div>
                            <div className="stats-info">
                                <span className="stats-number">{aluno.length}</span>
                                <span className="stats-label">Total de Alunos</span>
                            </div>
                        </div>
                        <div className="stats-card">
                            <div className="stats-icon">✔</div>
                            <div className="stats-info">
                                <span className="stats-number">{aluno.length}</span>
                                <span className="stats-label">Ativos</span>
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
                                            <span>Email</span>
                                            <div className="sort-icon">⇅</div>
                                        </div>
                                    </th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aluno.map((aluno, index) => {
                                    return (
                                        <tr key={aluno.id || aluno.matricula || index} className="table-row">
                                            
                                            <td>
                                                <div className="matricula-cell">
                                                    <span className="matricula-badge">{aluno.matricula}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="name-cell">
                                                    <div className="avatar">
                                                        <span>{aluno.nome?.charAt(0)?.toUpperCase()}</span>
                                                    </div>
                                                    <span className="name-text">{aluno.nome}</span>
                                                </div>
                                            </td> 
                                            <td>
                                                <div className="email-cell">
                                                    <span className="email-text">{aluno.email}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button onClick={() => handleEditar(aluno.matricula)} className="btn btn-edit">
                                                        <span className="btn-icon">✏️</span>
                                                        <span className="btn-text">Editar</span>
                                                    </button>
                                                    <button onClick={() => handleAvaliacoes(aluno.matricula)} className="btn btn-avaliacao">
                                                        <span className="btn-icon">⭐</span>
                                                        <span className="btn-text">Avaliações</span>
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
                            <span>Mostrando {aluno.length} de {aluno.length} alunos</span>
                        </div>
                        <div className="footer-actions">
                            <button className="btn-refresh" onClick={fetchAluno}>
                                <span>🔄</span> Atualizar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AlunosLista;
