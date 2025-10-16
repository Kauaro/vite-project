import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useState } from "react";
import ProjetoService from "../../services/ProjetoService";
import './css/projetonovo.css';

const ProjetoNovo = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();

    // Só permite acesso para professor/admin
    if (!isProfessor() && !isAdministrador()) {
        return (
            <div className="projeto-content">
                <h2>Acesso negado</h2>
                <p>Somente professores ou administradores podem criar projetos.</p>
                <Link to="/projetoslista">Voltar</Link>
            </div>
        );
    }

    const usuario = JSON.parse(localStorage.getItem("usuario")) || JSON.parse(localStorage.getItem("user")) || {};



    const [novoProjeto, setNovoProjeto] = useState({
        "nome": '',
        "descricao": '',
        "tema": '',
        "aluno": ''
    });

    const handleEditProjeto = (event, nome) => {
        setNovoProjeto({
            ...novoProjeto,
            [nome]: event.target.value,
        });
    };

    const handleProjeto = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/${usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProjeto),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        // Só tenta parsear se houver conteúdo
        let data = null;
        const text = await response.text();
        if (text) data = JSON.parse(text);

        console.log("Resposta do backend:", data);
        alert("Projeto cadastrado com sucesso!");
        navigate("/projetoslista");

    } catch (error) {
        console.error("Erro ao cadastrar projeto:", error);
        alert("Erro ao cadastrar projeto. Confira o console.");
    }
};

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
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
                <h2>CADASTRO DE NOVO PROJETO</h2>
                <p className="user-role">
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
            <div className="projeto-content-novo">
                <div className="navegador-projetos">
                    <div className="navegador-item-container">
                    <Link to="/projetoslista" className="navegador-item">Projetos</Link>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <span className="navegador-item active">Novo Projeto</span>
                    </div>
                </div>
                <section className="projeto-novo-section">
                    <div className="form-projeto">
                        <form className="form" onSubmit={handleProjeto}>
                            <div className="form-group">
                                <label htmlFor="inputNome">Nome do Projeto</label>
                                <input type="text" id="inputNome" value={novoProjeto.nome} onChange={(e) => {handleEditProjeto(e, 'nome')}} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescricao">Descrição</label>
                                <textarea id="inputDescricao" value={novoProjeto.descricao} onChange={(e) => {handleEditProjeto(e, 'descricao')}} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tema">Tema</label>
                                <select id="tema" name="tema" value={novoProjeto.tema} onChange={(e) => {handleEditProjeto(e, 'tema')}} required >
                                    <option value="">Selecione o tema</option>
                                    <option value="1">Racismo</option>
                                    <option value="2">Homofobia</option>
                                    <option value="3">Neurodivergente</option>
                                    <option value="4">Feminicidio</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputProfessor">Responsável</label>
                                <input id="inputProfessor" value={usuario?.nome || ''} readOnly disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAlunos">Alunos (separados por vírgula)</label>
                                <input type="text" id="inputAlunos" value={novoProjeto.aluno} onChange={(e) => {handleEditProjeto(e, 'aluno')}} required/>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn primary">Cadastrar Projeto</button>
                                <Link to="/projetoslista" className="btn secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjetoNovo;
