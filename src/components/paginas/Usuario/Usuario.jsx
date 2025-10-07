import { Link } from "react-router-dom";

import { useAuth } from '../../contexts/AuthContext';
import './css/Usuario.css';

export default function  Usuario() {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    
    const handleLogout = () => {
        logout();
        // O redirecionamento será feito automaticamente pelo ProtectedRoute
    };

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
          <h2>PAGINA DE USUARIO</h2>
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
                  <Link to="/alunoslista" className="access-card">
                    <div className="card-icon">📱</div>
                    <h4>Alunos</h4>
                    <p>Gerenciar lista de alunos</p>
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
            {/* Formulário de cadastro */}
            <div className="usuario-content">
                {/* Navegador Breadcrumb */}
                <div className="breadcrumb-navigator">
                    <div className="breadcrumb-item-container">
                        <span className="navegador-usuario-item active">Usuário</span>
                    </div>
                    <div className="breadcrumb-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="breadcrumb-item-container">
                        <Link to="/usuarioslista" className="navegador-usuario-item">Lista Usuário</Link>
                    </div>
                    <div className="breadcrumb-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="breadcrumb-item-container">
                        <Link to="/usuarionovo" className="navegador-usuario-item">Novo Usuário</Link>
                    </div>
                </div>

                <section className="usuario-section">
                    <div className="usuario-actions">
                        <Link to="/usuarionovo" className="novo-usuario">
                            Novo Usuário
                        </Link>
                        <Link to="/usuarioslista" className="lista-usuario">
                            Lista de Usuários
                        </Link>
                        <button onClick={handleLogout} className="logout-button">
                            Sair da Conta
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};


