import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import ProjetoService from "../../services/ProjetoService";
import './css/projetolista.css';


const ProjetosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout, canEditProject } = useAuth();
    const navigate = useNavigate();
    const [projetos, setProjetos] = useState([]);
    const [isUsingMock, setIsUsingMock] = useState(false);

    useEffect(() => {
        const carregarProjetos = async () => {
            try {
                const response = await ProjetoService.getAllProjetos();
                
                // Verifica se está usando dados mock
                if (response.data && response.data.length > 0 && response.data[0].hasOwnProperty('tema')) {
                    setIsUsingMock(true);
                }
                
                // Filtra projetos conforme o papel do usuário
                if (isAdministrador()) {
                    setProjetos(response.data);
                } else if (isProfessor()) {
                    setProjetos(response.data.filter(p => user.projetos.includes(p.id)));
                } else if (isAluno()) {
                    setProjetos(response.data.filter(p => user.projetos.includes(p.id)));
                }
            } catch (error) {
                console.error('Erro ao carregar projetos:', error);
                // Em caso de erro, usa dados mock
                setIsUsingMock(true);
                const projetosMock = [
                    {
                        id: '01',
                        nome: 'Projeto Consciência Negra',
                        descricao: 'Projeto interdisciplinar sobre a importância da Consciência Negra.',
                        professor: 'Prof. Elisangela',
                        alunos: ['João Vitor Pucci', 'Nicoly Naiane'],
                        tema: 'Consciência Negra'
                    }
                ];
                setProjetos(projetosMock);
            }
        };
        
        carregarProjetos();
    }, [user, isAluno, isProfessor, isAdministrador]);


    const handleLogout = () => {
        logout();
    };

    const handleEditar = (id) => {
        navigate(`/projetoeditar/${id}`);
    };

    const handleAvalia = (id) => {
        navigate(`/avaliacoes/${id}`);
    };

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await ProjetoService.deleteProjeto(id);
                setProjetos(projetos.filter(p => p.id !== id));
            } catch (error) {
                console.error('Erro ao excluir projeto:', error);
                alert('Erro ao excluir projeto. Tente novamente.');
            }
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
                {isUsingMock && (
                    <div style={{ 
                        background: '#fff3cd', 
                        border: '1px solid #ffeaa7', 
                        borderRadius: '4px', 
                        padding: '8px', 
                        margin: '10px 0',
                        fontSize: '14px',
                        color: '#856404'
                    }}>
                        ⚠️ Usando dados de demonstração (API não disponível)
                    </div>
                )}
            </div>
             {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="card-acesso-projeto">
          <div className="quick-access">
            <h3>Acesso Rápido</h3>
            <div className="cards-container">
              
              {/* Cards para Alunos */}
              {isAluno() && (
                <>
                <Link to="/home" className="access-card">
                    <div className="card-icon">🏠</div>
                    <h4>Inicio</h4>
                    <p>Tela inicial.</p>
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
                        {(isProfessor() || isAdministrador()) && (
                            <span className="navegador-separator">/</span>
                        )}
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
                                    {(isProfessor() || isAdministrador() || isAluno()) && <th>Ações</th>}
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
                                        {(isProfessor() || isAdministrador() || isAluno()) && (
                                            <td>
                                                {canEditProject(projeto.id) && (
                                                    <>
                                                        <button onClick={() => handleEditar(projeto.id)} className="btn warning">✏️ Editar</button>
                                                        <button onClick={() => handleExcluir(projeto.id)} className="btn danger">🗑️ Excluir</button>
                                                    </>
                                                )}
                                                {/* Botão de Avaliações sempre visível para todos os papéis */}
                                                <button onClick={() => handleAvalia(projeto.id)} className="btn visu">📊 Avaliacoes</button>
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
