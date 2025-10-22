import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import { FaUserPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import AlunoService from "../../services/AlunoService";
import { useAuth } from '../../contexts/AuthContext';

const TableApp = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState([]);

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    const handleEditar = (matricula) => {
        if (matricula) {
            navigate(`/alunoeditar/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno para edição.');
        }
    };

    const handleAvaliacoes = (matricula) => {
        if (matricula) {
            navigate(`/avaliacoesaluno/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno.');
        }
    };


    const handleExcluir = async (id) => {
        if (!id) {
            alert('Erro: Não foi possível identificar o aluno para exclusão.');
            return;
        }
        
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Aluno/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    alert("Aluno excluído com sucesso!");
                    fetchAluno();
                } else {
                    alert("Erro ao excluir aluno. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro ao excluir aluno:", error);
                alert("Erro ao excluir aluno. Tente novamente.");
            }
        }
    };

    const fetchAluno = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Aluno');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setAluno(data);
            } else {
                const aluno = data.aluno || [];
                setAluno(aluno);
            }
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
        }
    };

    useEffect(() => {
        fetchAluno();
    }, []);

    return (
        <div className="modern-table-container">
            <div className="table-header-modern">
                <div className="header-content">
                    <h2 className="table-title-modern">Gerenciamento de Usuários Aplicativo</h2>
                    <p className="table-subtitle">Visualize e gerencie todas as avaliaçõs e usuários do aplicativo.</p>
                </div>
            </div>
            
            <div className="table-content">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th className="th-user">
                                <div className="th-content">
                                    <span>Usuário</span>
                                </div>
                            </th>
                            <th className="th-email">
                                <div className="th-content">
                                    <span>Email</span>
                                </div>
                            </th>
                            <th className="th-matricula">
                                <div className="th-content">
                                    <span>Matrícula</span>
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
                        {aluno.map((aluno, index) => (
                            <tr key={index} className="table-row-modern">
                                <td className="td-user">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {aluno.nome ? aluno.nome.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div className="user-details">
                                            <span className="user-name">{aluno.nome || 'Nome não informado'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-email">
                                    <span className="email-text">{aluno.email || 'Email não informado'}</span>
                                </td>
                                <td className="td-matricula">
                                    <span className="matricula-badge-as">{aluno.matricula || 'N/A'}</span>
                                </td>
                                
                                <td className="td-actions">
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-action btn-star"
                                            onClick={() => handleAvaliacoes(aluno.matricula)}
                                            title="Avaliações"
                                        >
                                            <FaStar />
                                        </button>
                                        <button 
                                            className="btn-action btn-delete"
                                            onClick={() => handleExcluir(aluno.id, aluno.matricula)}
                                            title="Excluir usuário"
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
            
            
        </div>
    );
};

export default TableApp;