import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import './css/UsuarioEditar.css';

const UsuarioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/api/Usuario/${id}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data);
                } else {
                    setError('Usuário não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setError('Erro ao carregar dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUsuario();
        }
    }, [id]);

    const handleLogout = () => {
        logout();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação do ID
        if (!id) {
            alert('Erro: ID do usuário não encontrado.');
            return;
        }
        
        // Validação dos dados antes de enviar
        if (!usuario.nome || !usuario.email || !usuario.matricula || !usuario.nivelAcesso) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Se a senha estiver vazia, remove do objeto para não sobrescrever a atual
        const dadosParaEnviar = { ...usuario };
        if (!dadosParaEnviar.senha || dadosParaEnviar.senha.trim() === '') {
            delete dadosParaEnviar.senha;
        }
        
        // Log dos dados que serão enviados
        console.log('Dados para atualização:', dadosParaEnviar);
        console.log('ID do usuário:', id);
        
        try {
            // Primeiro tenta PUT, se falhar tenta POST
            let response = await fetch(`http://localhost:8080/api/Usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            // Se PUT falhar, tenta POST
            if (!response.ok && response.status === 405) {
                console.log('PUT não suportado, tentando POST...');
                response = await fetch(`http://localhost:8080/api/Usuario/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosParaEnviar),
                });
            }

            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                navigate('/usuarioslista');
            } else {
                const errorData = await response.text();
                console.error('Erro da API:', errorData);
                alert(`Erro ao atualizar usuário: ${response.status} - ${errorData}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="usuario-editar-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="usuario-editar-container">
                <div className="error">{error}</div>
                <button onClick={() => navigate('/usuarioslista')} className="btn secondary">
                    Voltar para Lista
                </button>
            </div>
        );
    }

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
                <h2>EDITAR USUÁRIO</h2>
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

            <div className="usuario-content">
                {/* Navegador Breadcrumb */}
                <div className="breadcrumb-navigator-usuario-novo">
                    <div className="navegador-item-container">
                        <Link to="/usuario" className="navegador-usuario-item">Usuário</Link>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <Link to="/usuarioslista" className="navegador-usuario-item">Lista Usuário</Link>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <span className="navegador-usuario-item active">Editar Usuário</span>
                    </div>
                </div>
                
                <section className="usuario-section">
                    <form className="form-grid" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputID">ID</label>
                            <input type="text" id="inputID" value={usuario.id || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMatricula">Matrícula</label>
                            <input type="text" id="inputMatricula" name="matricula" value={usuario.matricula || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" name="nome" value={usuario.nome || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" id="inputEmail4" name="email" value={usuario.email || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSenha">Senha</label>
                            <input type="password" id="inputSenha" name="senha" placeholder="DIGITE A SENHA" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAcesso">Nível de Acesso</label>
                            <select id="inputAcesso" name="nivelAcesso" value={usuario.nivelAcesso || ''} onChange={handleInputChange}>
                                <option value="">Selecione o nível de acesso</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn primary">Gravar Alterações</button>
                            <Link to="/usuarioslista" className="btn secondary">Cancelar</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioEditar;
