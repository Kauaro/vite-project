import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Table = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

    const getId = (id, matricula) => {
        const identificador = id || matricula;
        if (identificador) {
            navigate(`/usuarioeditar/${identificador}`);
        } else {
            alert('Erro: Não foi possível identificar o usuário para edição.');
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
                const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Usuario/${identificador}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    alert("Usuário excluído com sucesso!");
                    fetchUsuarios();
                } else {
                    alert("Erro ao excluir usuário. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro ao excluir usuário:", error);
                alert("Erro ao excluir usuário. Tente novamente.");
            }
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Usuario');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setUsuario(data);
            } else {
                const usuarios = data.usuario || [];
                setUsuario(usuarios);
            }
        } catch (error) {
            console.log('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className="modern-table-container">
            <div className="table-header-modern">
                <div className="header-content">
                    <h2 className="table-title-modern">Gerenciamento de Usuários</h2>
                    <p className="table-subtitle">Visualize e gerencie todos os usuários do sistema web</p>
                </div>
                <button className="btn-modern btn-primary" onClick={() => navigate('/usuarionovo')} >
                    <FaUserPlus className="icon" />
                    Novo Usuário
                </button>
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
                            <th className="th-nivel">
                                <div className="th-content">
                                    <span>Nível</span>
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
                        {usuario.map((user, index) => (
                            <tr key={index} className="table-row-modern">
                                <td className="td-user">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div className="user-details">
                                            <span className="user-name">{user.nome || 'Nome não informado'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-email">
                                    <span className="email-text">{user.email || 'Email não informado'}</span>
                                </td>
                                <td className="td-matricula">
                                    <span className="matricula-badge-as">{user.matricula || 'N/A'}</span>
                                </td>
                                <td className="td-nivel">
                                    <span className={`nivel-badge ${user.nivelAcesso?.toLowerCase() || 'default'}`}>
                                        {user.nivelAcesso || 'Não definido'}
                                    </span>
                                </td>
                                <td className="td-actions">
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-action btn-edit"
                                            onClick={() => getId(user.id, user.matricula)}
                                            title="Editar usuário"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="btn-action btn-delete"
                                            onClick={() => handleExcluir(user.id, user.matricula)}
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
            
            <div className="table-footer-modern">
                <div className="footer-info">
                    <span>Mostrando {usuario.length} usuários</span>
                </div>
            </div>
        </div>
    );
};

export default Table;