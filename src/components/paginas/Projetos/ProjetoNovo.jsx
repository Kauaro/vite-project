import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useState } from "react";
import ProjetoService from "../../services/ProjetoService";
import './css/projetonovo.css';
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";


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

        <>
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <Navbar />



        <div className="usuario-container">
            
            <div className="modern-form-container-projeto">
                <div className="form-header-projeto">
                    <div className="header-content">
                        <Link to="/projetoslista" className="back-button">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Voltar para Lista
                        </Link>
                        <h1 className="form-title">Novo Projeto</h1>
                        <p className="form-subtitle">Preencha os dados para cadastrar um novo projeto no sistema</p>
                    </div>
                </div>

                <div className="form-content-projeto">
                    <form className="modern-form" onSubmit={handleProjeto}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="inputNome" className="field-label">Nome do Projeto</label>
                                <input 
                                    type="text" 
                                    id="inputNome" 
                                    className="field-input"
                                    placeholder="Digite o nome do projeto"
                                    value={novoProjeto.nome} 
                                    onChange={(e) => {handleEditProjeto(e, 'nome')}} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="tema" className="field-label">Tema</label>
                                <select 
                                    id="tema" 
                                    className="field-select"
                                    value={novoProjeto.tema} 
                                    onChange={(e) => {handleEditProjeto(e, 'tema')}} 
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
                                    className="field-textarea"
                                    placeholder="Digite a descrição do projeto"
                                    value={novoProjeto.descricao} 
                                    onChange={(e) => {handleEditProjeto(e, 'descricao')}} 
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
                                    className="field-input"
                                    placeholder="Digite os alunos (separados por vírgula)"
                                    value={novoProjeto.aluno} 
                                    onChange={(e) => {handleEditProjeto(e, 'aluno')}} 
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-actions-projeto">
                            <button type="submit" className="btn-modern btn-primary">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Cadastrar Projeto
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
        </div>
        </>
    );
};

export default ProjetoNovo;
