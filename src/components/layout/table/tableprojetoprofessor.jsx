import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import ProjetoService from '../../services/ProjetoService';
import { useAuth } from '../../contexts/AuthContext';
import '../../contexts/AuthContext';




const TableProjetoProfessor = () => {
    const navigate = useNavigate();
    const [projeto, setProjeto] = useState([]);

    const user = JSON.parse(localStorage.getItem("usuario")) || JSON.parse(localStorage.getItem("user")) || {};

    const handleAvaliacoes = (codigo) => {
        if (codigo) {
            navigate(`/avaliacoes/${codigo}`);
        } else {
            alert('Erro: Não foi possível identificar o projeto.');
        }
    };

    const fetchProjeto = async () => {
        try {
            const usuarioId = user?.id;
            if (!usuarioId) {
                console.error('ID do usuário não encontrado');
                return;
            }
            
            const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/usuario/${usuarioId}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            setProjeto(Array.isArray(data) ? data : data.projeto || []);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            setProjeto([]);
        }
    };

    const handleExcluir = async (id, matricula) => {
        const identificador = id || matricula;
        
        if (!identificador) {
            alert('Erro: Não foi possível identificar o usuário para exclusão.');
            return;
        }
        
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/${identificador}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    alert("Projeto excluído com sucesso!");
                    fetchProjeto();
                } else {
                    alert("Erro ao excluir projeto. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro ao excluir projeto:", error);
                alert("Erro ao excluir projeto. Tente novamente.");
            }
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchProjeto();
        }
    }, [user?.id]);

    const handleEditar = (id) => {
        navigate(`/projetoeditar/${id}`);
    };


    const handleCadastrar = () => {

        
        navigate(`/projetonovo/${user.id}`);
    };

    return (
        <div className="modern-table-container-projeto">
            <div className="table-header-modern">
                <div className="header-content">
                    <h2 className="table-title-modern">Gerenciamento de Projetos</h2>
                    <p className="table-subtitle">Visualize e gerencie todos os projetos do sistema</p>
                </div>
                 
                <button className="btn-modern btn-primary" onClick={handleCadastrar}>
                    <FaPlus className="icon" />
                    Novo Projeto
                </button>
                 
            </div>
            
            <div className="table-content">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th className="th-user">
                                <div className="th-content">
                                    <span>Título</span>
                                </div>
                            </th>
                            <th className="th-email">
                                <div className="th-content">
                                    <span>Tema</span>
                                </div>
                            </th>
                            <th className="th-matricula">
                                <div className="th-content">
                                    <span>Código</span>
                                </div>
                            </th>
                            <th className="th-nivel">
                                <div className="th-content">
                                    <span>Responsável</span>
                                </div>
                            </th>
                            <th className="th-actions">
                                <div className="th-content">
                                    <span>Ações</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projeto.map((proj, index) => (
                            <tr key={index} className="table-row-modern">
                                <td className="td-user">
                                    <div className="user-info">
                                        
                                        <div className="user-details">
                                            <span className="user-name">{proj.nome || 'Nome não informado'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-email">
                                    <span className="email-text">{proj.tema || 'Tema não informado'}</span>
                                </td>
                                <td className="td-matricula">
                                    <span className="matricula-badge">{proj.codigo || 'N/A'}</span>
                                </td>
                                <td className="td-nivel">
                                    <span className="nivel-badge default">
                                        {proj.usuarioNome || 'Não definido'}
                                    </span>
                                </td>
                                <td className="td-actions">
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-action btn-star"
                                            onClick={() => handleAvaliacoes(proj.codigo)}
                                            title="Avaliações"
                                        >
                                            <FaStar />
                                        </button>   
                                        <button 
                                            className="btn-action btn-edit"
                                            onClick={() => handleEditar(proj.id)}
                                            title="Editar projeto"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="btn-action btn-delete"
                                            onClick={() => handleExcluir(proj.id)}
                                            title="Excluir projeto"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="table-footer-modern">
                <div className="footer-info">
                    <span>Mostrando {projeto.length} projetos</span>
                </div>
            </div>
        </div>
    );
};

export default TableProjetoProfessor;