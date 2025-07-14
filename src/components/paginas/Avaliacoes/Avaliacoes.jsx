import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import NavBar from '../../layout/navbar/navbar';
import './Avaliacoes.css';

const Avaliacoes = () => {
  const { user, isAluno } = useAuth();
  const { projetos, getUsuarioById } = useData();

  if (!isAluno()) {
    return (
      <div className="avaliacoes-container">
        <NavBar />
        <div className="error-message">
          <h2>Acesso Negado</h2>
          <p>Apenas alunos podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  // Filtra projetos em que o aluno participa
  const projetosDoAluno = projetos.filter(projeto => 
    projeto.alunos.includes(user.id)
  );

  return (
    <div className="avaliacoes-container">
      <NavBar />
      
      <div className="avaliacoes-content">
        <div className="avaliacoes-header">
          <h1>Minhas Avaliações</h1>
          <p>Visualize suas notas e comentários dos projetos</p>
        </div>

        {projetosDoAluno.length === 0 ? (
          <div className="no-projects">
            <h3>Nenhum projeto encontrado</h3>
            <p>Você ainda não está participando de nenhum projeto.</p>
          </div>
        ) : (
          <div className="avaliacoes-grid">
            {projetosDoAluno.map(projeto => {
              const avaliacao = projeto.avaliacoes.find(a => a.alunoId === user.id);
              
              return (
                <div key={projeto.id} className="avaliacao-card">
                  <div className="projeto-info">
                    <h3>{projeto.nome}</h3>
                    <p className="projeto-descricao">{projeto.descricao}</p>
                    <p className="professor">Professor: {projeto.professor}</p>
                    <p className="data">Data de criação: {projeto.dataCriacao}</p>
                  </div>

                  <div className="avaliacao-info">
                    {avaliacao ? (
                      <>
                        <div className="nota-container">
                          <span className="nota-label">Nota:</span>
                          <span className={`nota ${getNotaClass(avaliacao.nota)}`}>
                            {avaliacao.nota.toFixed(1)}
                          </span>
                        </div>
                        <div className="comentario">
                          <h4>Comentário do Professor:</h4>
                          <p>{avaliacao.comentario}</p>
                        </div>
                      </>
                    ) : (
                      <div className="sem-avaliacao">
                        <p>📝 Avaliação pendente</p>
                        <span>Seu professor ainda não avaliou este projeto.</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Resumo das avaliações */}
        {projetosDoAluno.length > 0 && (
          <div className="resumo-avaliacoes">
            <h3>Resumo das Avaliações</h3>
            <div className="resumo-stats">
              <div className="stat">
                <span className="stat-number">{projetosDoAluno.length}</span>
                <span className="stat-label">Projetos Participando</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {projetosDoAluno.filter(p => 
                    p.avaliacoes.find(a => a.alunoId === user.id)
                  ).length}
                </span>
                <span className="stat-label">Projetos Avaliados</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {getMediaGeral()}
                </span>
                <span className="stat-label">Média Geral</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function getNotaClass(nota) {
    if (nota >= 9) return 'excelente';
    if (nota >= 8) return 'muito-bom';
    if (nota >= 7) return 'bom';
    if (nota >= 6) return 'regular';
    return 'insuficiente';
  }

  function getMediaGeral() {
    const avaliacoes = projetosDoAluno
      .map(projeto => projeto.avaliacoes.find(a => a.alunoId === user.id))
      .filter(avaliacao => avaliacao)
      .map(avaliacao => avaliacao.nota);

    if (avaliacoes.length === 0) return 'N/A';
    
    const media = avaliacoes.reduce((sum, nota) => sum + nota, 0) / avaliacoes.length;
    return media.toFixed(1);
  }
};

export default Avaliacoes; 