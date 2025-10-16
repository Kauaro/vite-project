import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AvaliacoesAluno() {
  const { isAluno, isProfessor, isAdministrador } = useAuth();
  const { matricula } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Avaliacao/matricula/${matricula}`);
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

    const fetchAluno = async () => {
      try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Aluno/${matricula}`);
        if (response.ok) {
          const data = await response.json();
          setAluno(data);
        }
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
      }
    };

    if (matricula) {
      fetchAvaliacoes();
      fetchAluno();
    }
  }, [matricula]);

  return (
    <div className="avaliacoes-container">
      <div className="logout-top-right">
        <Link to="/login" className="logout-button-top">
          <span className="logout-icon">🚪</span>
          Sair
        </Link>
      </div>

      <div className="section-avaliacoes">
        <h2>AVALIAÇÕES DO ALUNO</h2>
        <p className="avaliacoes-role">
          {isAluno() && "🎓 Aluno"}
          {isProfessor() && "👨🏫 Professor"}
          {isAdministrador() && "⚙️ Administrador"}
        </p>
      </div>

      
      <div className="quick-access-wrapper">
        <div className="card-acesso-avaliacoes-aluno">
          <div className="quick-access">
            <h3>Acesso Rápido</h3>
            <div className="cards-container">
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
        <div className="avaliacoes-projetos-aluno">
        <div className="avaliacoes-projetos-container">
          <h3>Avaliações - {aluno?.nome || `Matrícula ${matricula}`}</h3>
          
          {aluno && (
            <div className="aluno-info">
              <div className="info-card">
                <span className="info-label">👤 Nome:</span>
                <span className="info-value">{aluno.nome}</span>
              </div>
              <div className="info-card">
                <span className="info-label">🎓 Matrícula:</span>
                <span className="info-value">{aluno.matricula}</span>
              </div>
              {aluno.email && (
                <div className="info-card">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">{aluno.email}</span>
                </div>
              )}
            </div>
          )}

          <div className="avaliacoes-stats">
            <div className="stat-card">
              <div className="stat-number">{avaliacoes.length}</div>
              <div className="stat-label">Total de Avaliações</div>
            </div>
            {avaliacoes.length > 0 && (
              <>
                <div className="stat-card">
                  <div className="stat-number">
                    {(avaliacoes.reduce((sum, av) => sum + (av.nota || 0), 0) / avaliacoes.length).toFixed(1)}
                  </div>
                  <div className="stat-label">Média Geral</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{Math.max(...avaliacoes.map(av => av.nota || 0))}</div>
                  <div className="stat-label">Maior Nota</div>
                </div>
              </>
            )}
          </div>

          <table className="avaliacoes-table">
            <thead>
              <tr>
                <th>📋 Avaliação</th>
                <th>👤 Usuario</th>
                <th>📝 Comentário</th>
                <th>📊 Nota</th>
                <th>📅 Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="loading-cell">
                    <div className="loading-spinner"></div>
                    Carregando avaliações...
                  </td>
                </tr>
              ) : (
                avaliacoes.length > 0 ? (
                  avaliacoes.map((avaliacao) => (
                    <tr key={avaliacao.id}>
                      <td>
                        <div className="avaliacao-info">
                          <strong>{avaliacao.nome || `Avaliação #${avaliacao.id}`}</strong>
                          <small>ID: {avaliacao.id}</small>
                        </div>
                      </td> 
                      <td>
                        <div className="comentario-cell">
                          {avaliacao.comentario || avaliacao.descricao || 'Sem comentário'}
                        </div>
                      </td>
                      <td>
                        <div className={`nota-badge ${avaliacao.nota >= 7 ? 'nota-boa' : avaliacao.nota >= 5 ? 'nota-media' : 'nota-baixa'}`}>
                          {avaliacao.nota ? avaliacao.nota.toFixed(1) : 'N/A'}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${avaliacao.nota ? 'avaliado' : 'pendente'}`}>
                          {avaliacao.nota ? '✅ Avaliado' : '⏳ Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="empty-state">
                      <div className="empty-content">
                        <div className="empty-icon">📝</div>
                        <h4>Nenhuma avaliação encontrada</h4>
                        <p>Este aluno ainda não possui avaliações registradas.</p>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
