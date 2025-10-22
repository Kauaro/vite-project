import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/UsuarioNovo.css';
import Navbar from "../../layout/navbar/navbar";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { useAuth } from '../../contexts/AuthContext';


const UsuarioEditar = () => {


    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUsuario();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usuario.nome || !usuario.email || !usuario.nivelAcesso) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const dadosParaEnviar = { ...usuario };
        if (!dadosParaEnviar.senha || dadosParaEnviar.senha.trim() === '') {
            delete dadosParaEnviar.senha;
        }
        
        try {
            const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                navigate('/usuarioslista');
            } else {
                alert('Erro ao atualizar usuário. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário. Tente novamente.');
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
        return <div className="loading">Carregando...</div>;
    }

    return (

        <>
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <Navbar />
        <div className="modern-form-container">
            <div className="form-header">
                <div className="header-content">
                    <Link to="/usuarioslista" className="back-button">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para Lista
                    </Link>
                    <h1 className="form-title">Editar Usuário</h1>
                    <p className="form-subtitle">Atualize os dados do usuário no sistema</p>
                </div>
            </div>

            <div className="form-content-editar">
                <form className="modern-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="inputID" className="field-label">ID</label>
                            <input 
                                type="text" 
                                id="inputID" 
                                className="field-input"
                                value={usuario.id || ''} 
                                readOnly 
                                disabled 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputMatricula" className="field-label">Matrícula</label>
                            <input 
                                type="text" 
                                id="inputMatricula" 
                                className="field-input"
                                value={usuario.matricula || ''} 
                                readOnly 
                                disabled 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputNome" className="field-label">Nome Completo</label>
                            <input 
                                type="text" 
                                id="inputNome" 
                                name="nome" 
                                className="field-input"
                                placeholder="Digite o nome completo"
                                value={usuario.nome || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputEmail4" className="field-label">Email</label>
                            <input 
                                type="email" 
                                id="inputEmail4" 
                                name="email" 
                                className="field-input"
                                placeholder="Digite o email"
                                value={usuario.email || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        
                        
                        <div className="form-field">
                            <label htmlFor="inputAcesso" className="field-label">Nível de Acesso</label>
                            <select 
                                id="inputAcesso" 
                                name="nivelAcesso" 
                                className="field-select"
                                value={usuario.nivelAcesso || ''} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Selecione o nível de acesso</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-actions-editar">
                        <button type="submit" className="btn-modern btn-primary">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Gravar Alterações
                        </button>
                        <Link to="/usuarioslista" className="btn-modern btn-secondary">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default UsuarioEditar;