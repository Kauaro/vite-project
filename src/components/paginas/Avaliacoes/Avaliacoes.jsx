import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

export default function Avaliacoes() {
  const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
  const { projetos } = useData();

  // Para aluno, só pode participar de 1 projeto
  const projetosParaExibir = isAluno() ? projetos.slice(0, 1) : projetos;

  return (

<div className="avaliacoes-container">
            {/* Botão de sair no canto superior direito */}
            <div className="logout-top-right">
              
                <Link to="/login" className="logout-button-top">
                    <span className="logout-icon">🚪</span>
                    Sair
                </Link>
            </div>

            {/* Seção de boas-vindas personalizada */}

        <div className="section-avaliacoes">
          <h2>PAGINA DE AVALIAÇÕES</h2>
          <p className="avaliacoes-role">
            {isAluno() && "🎓 Aluno"}
            {isProfessor() && "👨‍🏫 Professor"}
            {isAdministrador() && "⚙️ Administrador"}
          </p>
        </div>

      {/* 
      <div className="card-projeto-avaliacoes">
        <div className="acesso">
          <h3>Meus Projetos</h3>
          <div className="cards-container-avaliacoes">
            {projetosParaExibir.length === 0 && (
              <div className="access-card">
                <div className="card-icon">❌</div>
                <h4>Nenhum projeto encontrado</h4>
                <p>Você ainda não participa de nenhum projeto.</p>
              </div>
            )}
            {projetosParaExibir.map((projeto) => (
              <div className="access-card" key={projeto.id}>
                <div className="card-icon">📋</div>
                <h4>{projeto.nome}</h4>
                <p>{projeto.descricao}</p>
                <p><b>Professor:</b> {projeto.professor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
       */}

        {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="card-acesso-avaliacoes">
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
                  <Link to="/avaliacoes" className="access-card">
                    <div className="card-icon">📊</div>
                    <h4>Minhas Avaliações</h4>
                    <p>Ver notas e comentários dos projetos</p>
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
                  <Link to="/avaliacoes" className="access-card">
                    <div className="card-icon">📊</div>
                    <h4>Avaliações</h4>
                    <p>Ver notas e comentários dos projetos</p>
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
                  <Link to="/avaliacoes" className="access-card">
                    <div className="card-icon">📊</div>
                    <h4>Avaliações</h4>
                    <p>Ver notas e comentários dos projetos</p>
                  </Link>
                  
                </>
              )}
            </div>
          </div>
        </div>

      </div>
  );
}