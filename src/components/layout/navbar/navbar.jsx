import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './navbar.css';

// Componente para ícones SVG profissionais
const Icon = ({ name, className = "" }) => {
    const icons = {
        dashboard: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
        ),
        projects: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        add: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        ),
        users: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
        ),
        students: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        analytics: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        logout: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        )
    };
    return icons[name] || null;
};

export default function Navbar() {
    const { isAluno, isProfessor, isAdministrador, user } = useAuth();

    return (
        <nav className="professional-navbar">
            {/* Header com Logo e Usuário */}
            <div className="navbar-header">
                <div className="navbar-brand">
                    <div className="brand-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="brand-info">
                        <h1 className="brand-title">SLA Gestão</h1>
                        <p className="brand-subtitle">Sistema de Gestão</p>
                    </div>
                </div>
            </div>

            {/* Menu de Navegação */}
            <div className="navbar-menu">
                <div className="menu-section">
                    <h3 className="section-title">Principal</h3>
                    
                    {/* Navegação para Alunos */}
                    {isAluno() && (
                        <>
                            <Link to="/home" className="nav-item active">
                                <Icon name="dashboard" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Dashboard</span>
                                    <span className="nav-description">Visão geral do sistema</span>
                                </div>
                            </Link>
                            
                            <Link to="/projetoslista" className="nav-item">
                                <Icon name="projects" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Meus Projetos</span>
                                    <span className="nav-description">Projetos em que participo</span>
                                </div>
                            </Link>
                        </>
                    )}

                    {/* Navegação para Professores */}
                    {isProfessor() && (
                        <>
                            <Link to="/home" className="nav-item active">
                                <Icon name="dashboard" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Dashboard</span>
                                    <span className="nav-description">Visão geral do sistema</span>
                                </div>
                            </Link>
                            
                            <Link to="/projetoslista" className="nav-item">
                                <Icon name="projects" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Meus Projetos</span>
                                    <span className="nav-description">Gerenciar projetos</span>
                                </div>
                            </Link>
                            
                            <Link to="/projetonovo" className="nav-item">
                                <Icon name="add" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Novo Projeto</span>
                                    <span className="nav-description">Criar novo projeto</span>
                                </div>
                            </Link>
                        </>
                    )}

                    {/* Navegação para Administradores */}
                    {isAdministrador() && (
                        <>
                            <Link to="/home" className="nav-item active">
                                <Icon name="dashboard" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Dashboard</span>
                                    <span className="nav-description">Visão geral do sistema</span>
                                </div>
                            </Link>
                            
                            <Link to="/usuarioslista" className="nav-item">
                                <Icon name="users" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Usuários</span>
                                    <span className="nav-description">Gerenciar usuários</span>
                                </div>
                            </Link>
                            
                            <Link to="/alunoslista" className="nav-item">
                                <Icon name="students" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Usuários App</span>
                                    <span className="nav-description">Gerenciar usuários do App</span>
                                </div>
                            </Link>
                            
                            <Link to="/projetoslista" className="nav-item">
                                <Icon name="analytics" className="nav-icon" />
                                <div className="nav-content">
                                    <span className="nav-title">Projetos</span>
                                    <span className="nav-description">Analisar projetos</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Footer com Logout */}
            <div className="navbar-footer">
                <Link to="/login" className="logout-item">
                    <Icon name="logout" className="logout-icon" />
                    <span>Sair</span>
                </Link>
            </div>
        </nav>
    );
}