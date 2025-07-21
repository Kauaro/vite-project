import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useState } from "react";
import ProjetoService from "../../services/ProjetoService";
import './css/projetonovo.css';

const ProjetoNovo = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [professor, setProfessor] = useState(""); 
    const [alunos, setAlunos] = useState(""); // lista separada por vírgula
    const [tema, setTema] = useState(""); // Adicionado para armazenar o tema selecionado
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoProjeto = {
            nome,
            descricao,
            professor: user.name,
            alunos: alunos.split(',').map(a => a.trim()).filter(Boolean),
            tema: tema, // Adicionado o tema ao objeto do projeto
        };
        try {
            await ProjetoService.createProjeto(novoProjeto);
            alert("Projeto cadastrado com sucesso!");
            navigate("/projetoslista");
        } catch (error) {
            console.error("Erro ao cadastrar projeto:", error);
            alert("Erro ao cadastrar projeto!");
        }
    };

    const handleLogout = () => {
        logout();
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
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputNome">Nome do Projeto</label>
                                <input type="text" id="inputNome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescricao">Descrição</label>
                                <textarea id="inputDescricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tema">Tema</label>
                                <select id="tema" name="tema" value={tema} onChange={e => setTema(e.target.value)} required>
                                    <option value="">Selecione o tema</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputProfessor">Professor</label>
                                <input id="inputProfessor" value={professor} onChange={(e) => setProfessor(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAlunos">Alunos (separados por vírgula)</label>
                                <input type="text" id="inputAlunos" value={alunos} onChange={(e) => setAlunos(e.target.value)} />
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
