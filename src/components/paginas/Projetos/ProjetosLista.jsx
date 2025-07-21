import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import ProjetoService from "../../services/ProjetoService";
import './css/projetolista.css';


const ProjetosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout, canEditProject } = useAuth();
    const navigate = useNavigate();
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        ProjetoService.getAllProjetos()
            .then((response) => {
                // Filtra projetos conforme o papel do usuário
                if (isAdministrador()) {
                    setProjetos(response.data);
                } else if (isProfessor()) {
                    setProjetos(response.data.filter(p => user.projetos.includes(p.id)));
                } else if (isAluno()) {
                    setProjetos(response.data.filter(p => user.projetos.includes(p.id)));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user, isAluno, isProfessor, isAdministrador]);

    const handleLogout = () => {
        logout();
    };

    const handleEditar = (id) => {
        navigate(`/projetoeditar/${id}`);
    };

    const handleAvalia = () => {
        navigate("/avaliacoes");
    };

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            await ProjetoService.deleteProjeto(id);
            setProjetos(projetos.filter(p => p.id !== id));
        }
    };

    return (
        <div className="usuario-container">
            <div className="logout-top-right">
                <button onClick={handleLogout} className="logout-button-top">
                    <span className="logout-icon">🚪</span>
                    Sair
                </button>
            </div>
            <div className="section-usuario">
                <h2>LISTA DE PROJETOS</h2>
                <p className="user-role">
                    {isAluno() && "🎓 Aluno"}
                    {isProfessor() && "👨‍🏫 Professor"}
                    {isAdministrador() && "⚙️ Administrador"}
                </p>
            </div>
             {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="card-acesso-projeto">
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
            <div className="projeto-content">
                <div className="navegador-projetos">
                    <div className="navegador-item-container">
                        <span className="navegador-item active">Projetos</span>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        {(isProfessor() || isAdministrador()) && (
                            <Link to="/projetonovo" className="navegador-item">Novo Projeto</Link>
                        )}
                    </div>
                </div>
                <section className="projeto-section">
                    <div className="table-wrapper">
                        <table className="projetos-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Tema</th>
                                    <th>Professor</th>
                                    <th>Alunos</th>
                                    {(isProfessor() || isAdministrador()) && <th>Ações</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {projetos?.map((projeto) => (
                                    <tr key={projeto.id}>
                                        <td>{projeto.id}</td>
                                        <td>{projeto.nome}</td>
                                        <td>{projeto.descricao}</td>
                                        <td>{projeto.tema}</td> 
                                        <td>{projeto.professor}</td>
                                        <td>{projeto.alunos?.join(', ')}</td>
                                        {(isProfessor() || isAdministrador()) && (
                                            <td>
                                                {canEditProject(projeto.id) && (
                                                    <>
                                                        <button onClick={() => handleEditar(projeto.id)} className="btn warning">✏️ Editar</button>
                                                        <button onClick={() => handleExcluir(projeto.id)} className="btn danger">🗑️ Excluir</button>
                                                        <button onClick={() => handleAvalia(projeto.id)} className="btn visu">📊 Avaliacoes</button>
                                                    </>
                                                )}
                                            </td>
                                        )}
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

export default ProjetosLista;
