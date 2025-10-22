import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/projetonovo.css';
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import { useAuth } from '../../contexts/AuthContext';


const ProjetoEditar = () => {
      const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();

    const { id } = useParams();
    const navigate = useNavigate();
    const [projeto, setProjeto] = useState({});
    const [loading, setLoading] = useState(true);
    const usuario = JSON.parse(localStorage.getItem("usuario")) || JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        const fetchProjeto = async () => {
            try {
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/id/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados do projeto:', data);
                    setProjeto(data);
                } else {
                    console.error('Projeto não encontrado');
                    alert('Projeto não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar projeto:', error);
                alert('Erro ao carregar dados do projeto');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProjeto();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!projeto.nome || !projeto.descricao || !projeto.tema) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        try {
            const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projeto),
            });

            if (response.ok) {
                alert('Projeto atualizado com sucesso!');
                navigate('/projetoslista');
            } else {
                alert('Erro ao atualizar projeto. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            alert('Erro ao atualizar projeto. Tente novamente.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjeto(prev => ({
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
                    <Link to="/projetoslista" className="back-button">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para Lista
                    </Link>
                    <h1 className="form-title">Editar Projeto</h1>
                    <p className="form-subtitle">Atualize os dados do projeto no sistema</p>
                </div>
            </div>

            <div className="form-content">
                <form className="modern-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="inputID" className="field-label">ID</label>
                            <input 
                                type="text" 
                                id="inputID" 
                                className="field-input"
                                value={projeto.id || ''} 
                                readOnly 
                                disabled 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputNome" className="field-label">Nome do Projeto</label>
                            <input 
                                type="text" 
                                id="inputNome" 
                                name="nome" 
                                className="field-input"
                                placeholder="Digite o nome do projeto"
                                value={projeto.nome || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="tema" className="field-label">Tema</label>
                            <select 
                                id="tema" 
                                name="tema" 
                                className="field-select"
                                value={projeto.tema || ''} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Selecione o tema</option>
                                <option value="Racismo">Racismo</option>
                                <option value="Homofobia">Homofobia</option>
                                <option value="Neurodivergente">Neurodivergente</option>
                                <option value="Feminicídio">Feminicídio</option>
                                <option value="Cultural">Cultural</option>
                            </select>
                        </div>
                        
                        <div className="form-field full-width">
                            <label htmlFor="inputDescricao" className="field-label">Descrição</label>
                            <textarea 
                                id="inputDescricao" 
                                name="descricao" 
                                className="field-textarea"
                                placeholder="Digite a descrição do projeto"
                                value={projeto.descricao || ''} 
                                onChange={handleInputChange} 
                                required 
                                rows="4"
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputProfessor" className="field-label">Responsável</label>
                            <input 
                                id="inputProfessor" 
                                className="field-input"
                                value={usuario?.nome || ''} 
                                readOnly 
                                disabled 
                            />
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="inputAlunos" className="field-label">Alunos</label>
                            <input 
                                type="text" 
                                id="inputAlunos" 
                                name="aluno" 
                                className="field-input"
                                placeholder="Digite os alunos (separados por vírgula)"
                                value={projeto.aluno || ''} 
                                onChange={handleInputChange} 
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-modern btn-primary">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Gravar Alterações
                        </button>
                        <Link to="/projetoslista" className="btn-modern btn-secondary">
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

export default ProjetoEditar;