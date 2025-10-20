import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/UsuariosLista.css';
import UsuarioService from "../../services/UsuarioService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";

const UsuariosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    const getId = (id, matricula) => {
        const identificador = id || matricula;
        if (identificador) {
            navigate(`/usuarioeditar/${identificador}`);
        } else {
            alert('Erro: Não foi possível identificar o usuário para edição.');
        }
    };

    const [usuario, setUsuario] = useState([]);

    // Função para excluir usuário
    const handleExcluir = async (id, matricula) => {
        console.log('Tentando excluir usuário com ID:', id, 'Matrícula:', matricula); // Debug
        
        // Usa matricula se id não estiver disponível
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
                    // Atualiza a lista de usuários sem recarregar a página
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

    // Função para buscar usuários
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

        <>
        <Navbar />  
            {/* Seção de boas-vindas personalizada */}
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <div className="usuario-container">
            

            {/* Tabela de usuários */}
            <div className="usuario-content">
                {/* Navegador Breadcrumb */}
                <div className="navegador-usuarios">
                    
                    <div className="navegador-item-container">
                        <span className="navegador-item active">Lista Usuário</span>
                    </div>
                    <div className="navegador-separator-container">
                        <span className="navegador-separator">/</span>
                    </div>
                    <div className="navegador-item-container">
                        <Link to="/usuarionovo" className="navegador-item">Novo Usuário</Link>
                    </div>
                </div>

                <section className="usuario-section-tabela">
                    

                    {/* Tabela moderna e sofisticada */}
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-title">
                                <h2>Gerenciamento de Usuários</h2>
                                <p>Visualize e gerencie todos os usuários do sistema</p>
                            </div>
                            <div className="table-actions">
                                <div className="search-container">
                                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Buscar usuários..."
                                        className="search-input"
                                    />
                                </div>
                                <button className="filter-btn">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                    </svg>
                                    Filtros
                                </button>
                            </div>
                        </div>
                        
                        <div className="table-wrapper">
                            <table className="usuarios-table">
                                <thead>
                                    <tr>
                                        <th className="th-user">
                                            <div className="th-content">
                                                <span>Usuário</span>
                                            </div>
                                        </th>
                                        <th className="th-matricula">
                                            <div className="th-content">
                                                <span>Matrícula</span>
                                                <svg className="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="th-status">
                                            <div className="th-content">
                                                <span>Nivel de Acesso</span>
                                                <svg className="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="th-role">
                                            <div className="th-content">
                                                <span>Função</span>
                                                <svg className="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuario.map((usuarioItem, index) => {
                                        

                                        const getRoleColor = (role) => {
                                            switch(role) {
                                                case 'aluno': return 'success';
                                                case 'professor': return 'primary';
                                                case 'administrador': return 'dark';
                                                default: return 'secondary';
                                            }
                                        };

                                        
                                        return (
                                            <tr key={index} className="table-row">
                                                <td className="user-cell">
                                                    <div className="user-profile">
                                                        <div className="avatar-container">
                                                            <div className="avatar">
                                                                {usuarioItem.nome ? usuarioItem.nome.charAt(0).toUpperCase() : 'U'}
                                                            </div>
                                                            <div className="status-indicator active"></div>
                                                        </div>
                                                        <div className="user-info">
                                                            <div className="user-name">{usuarioItem.nome || 'Nome não informado'}</div>                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="matricula-cell">
                                                    <div className="matricula-code">
                                                        <span className="code-number">{usuarioItem.matricula || usuarioItem.id || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="status-cell">
                                                    <div className={`role-badge ${getRoleColor(usuarioItem.nivelAcesso)}`}>
                                                        <span className="role-text">{usuarioItem.nivelAcesso || 'Não definido'}</span>
                                                    </div>
                                                </td>
                                                
                                                <td className="actions-cell">
                                                    <div className="action-menu">
                                                        <button 
                                                            className="action-btn primary"
                                                            onClick={() => getId(usuarioItem.id, usuarioItem.matricula)}
                                                            title="Editar usuário"
                                                        >
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button 
                                                            className="action-btn secondary"
                                                            title="Ver detalhes"
                                                        >
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button 
                                                            className="action-btn danger"
                                                            onClick={() => handleExcluir(usuarioItem.id, usuarioItem.matricula)}
                                                            title="Excluir usuário"
                                                        >
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Footer sofisticado */}
                        <div className="table-footer">
                            <div className="footer-left">
                                <div className="pagination-info">
                                    <span>Mostrando <strong>1-{usuario.length}</strong> de <strong>{usuario.length}</strong> usuários</span>
                                </div>
                            </div>
                            <div className="footer-right">
                                <div className="pagination">
                                    <button className="page-btn disabled">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="page-btn active">1</button>
                                    <button className="page-btn">2</button>
                                    <button className="page-btn">3</button>
                                    <button className="page-btn">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <button 
                                    className="refresh-btn"
                                    onClick={fetchUsuarios}
                                    title="Atualizar dados"
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
};

export default UsuariosLista;
