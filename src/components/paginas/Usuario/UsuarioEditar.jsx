import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import './css/UsuarioEditar.css';
import './css/UsuarioNovo.css';
import Navbar from "../../layout/navbar/navbar"
import Sidebar from "../../layout/Sidebar/Sidebar"



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
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${id}`);
                
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
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
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
            let response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            // Se PUT falhar, tenta POST
            if (!response.ok && response.status === 405) {
                console.log('PUT não suportado, tentando POST...');
                response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${id}`, {
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
        <>

        <Navbar /> 
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <div className="usuario-container-editar">
            
            
        {/* Formulário de cadastro */}
        <div className="modern-form-container">
                <div className="form-header">
                    <div className="header-content">
                      
                        <h1 className="form-title">Novo Usuário</h1>
                        <p className="form-subtitle">Preencha os dados para cadastrar um novo usuário no sistema</p>
                    </div>
                </div>

                <div className="form-novo-content">
                    <form className="modern-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                        <div className="form-field">
                                <label htmlFor="inputId" className="field-label">ID</label>
                                <input 
                                    type="text" 
                                    id="inputMatricula" 
                                    className="field-input"
                                    value={usuario.id || ''}
                                    readOnly disabled 
                                     
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="inputNome" className="field-label">Nome Completo</label>
                                <input 
                                    type="text" 
                                    id="inputNome" 
                                    className="field-input"
                                    value={usuario.nome || ""}
                                    onChange={handleInputChange} 
                                     
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputMatricula" className="field-label">Matrícula</label>
                                <input 
                                    type="text" 
                                    id="inputMatricula" 
                                    className="field-input"
                                    value={usuario.matricula || ''}
                                    readOnly disabled 
                                     
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputEmail4" className="field-label">Email</label>
                                <input 
                                    type="email" 
                                    id="inputEmail4" 
                                    className="field-input"
                                    value={usuario.email || ''}
                                    onChange={handleInputChange} 
                                     
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="inputSenha" className="field-label">Senha</label>
                                <input 
                                    type="password" 
                                    id="inputSenha" 
                                    className="field-input"
                                    value={usuario.senha || ''}
                                    onChange={handleInputChange}
                                     
                                />
                            </div>
                            
                           
                            
                            <div className="form-field full-width">
                                <label htmlFor="inputAcesso" className="field-label">Nível de Acesso</label>
                                <select 
                                    id="inputAcesso" 
                                    className="field-select"
                                    value={usuario.nivelAcesso || ''}
                                    onChange={handleInputChange}
                                    
                                >
                                    <option value="">Selecione o nível de acesso</option>
                                    <option value="aluno">Aluno</option>
                                    <option value="professor">Professor</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-novo-actions">
                            <button type="submit" className="btn-modern btn-primary-cadastro">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Cadastrar Usuário
                            </button>
                            <Link to="/usuarioslista" className="btn-modern btn-secondary-cadastro">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>

        </>
    );
};

export default UsuarioEditar;
