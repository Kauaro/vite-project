import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import '../Projetos/ProjetosLista'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Avaliacoes() {
  const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProjetoById, getUsuarioById } = useData();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const projeto = getProjetoById(id);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Avaliacao/codigo/${projeto?.Codigo}`);
        if (response.ok) {
          const data = await response.json();
          setAvaliacoes(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projeto?.Codigo) {
      fetchAvaliacoes();
    } else {
      setLoading(false);
    }
  }, [id]);

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

      {/* AVALIAÇÕES PROJETOS */}
    <div className="avaliacoes-projetos">
      <div className="avaliacoes-projetos-container">
        <h3>Avaliações do Projeto  - {projeto?.nome}</h3>
        <table className="avaliacoes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Descrição</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Carregando...</td>
              </tr>
            ) : (
              avaliacoes.map((avaliacao, idx) => (
                <tr key={avaliacao.id || idx}>
                  <td>{avaliacao.nome || avaliacao.alunoNome}</td>
                  <td>{avaliacao.matricula || avaliacao.alunoMatricula}</td>
                  <td>{avaliacao.comentario || avaliacao.descricao}</td>
                  <td>{avaliacao.nota}</td>
                </tr>
              ))
            )}
            {!loading && avaliacoes.length === 0 && (
              <tr>
                <td colSpan={4}>Nenhuma avaliação encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    </div>       

        {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="quick-access-wrapper">
        <div className="card-acesso-avaliacoes">
          <div className="quick-access">
            <h3>Acesso Rápido</h3>
            <div className="cards-container">
              
              {/* Cards para Alunos */}
                        {isAluno() && (
                            <>
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                            </Link>
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
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                            </Link>
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
                            <Link to="/home" className="access-card">
                                <div className="card-icon">🏠</div>
                                <h4>Dashboard</h4>
                                <p>Tela inicial com todas as navegações.</p>
                            </Link>
                            <Link to="/usuarioslista" className="access-card">
                                <div className="card-icon">👥</div>
                                <h4>Usuários</h4>
                                <p>Gerenciar alunos, professores e administradores</p>
                            </Link>
                            <Link to="/alunoslista" className="access-card">
                                <div className="card-icon">📱</div>
                                <h4>Alunos</h4>
                                <p>Gerenciar lista de alunos</p>
                            </Link>
                            <Link to="/projetoslista" className="access-card">
                                <div className="card-icon">📊</div>
                                <h4>Projetos</h4>
                                <p>Visualizar e gerenciar todos os projetos</p>
                            </Link>
                            </>
                        )}
            </div>
          </div>
        </div>
        </div>

      </div>
  );
}