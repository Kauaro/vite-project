import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Table.css';

const TableAvaliacoes = () => {
  const params = useParams();
  const { codigo } = params;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Todos os parâmetros:', params);
    console.log('Código recebido:', codigo);
    

    const codigoParam = Object.values(params)[0];
    console.log('Usando parâmetro:', codigoParam);
    
    if (codigoParam) {
      const fetchAvaliacoesWithParam = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Avaliacao/codigo/${codigoParam}`);
          console.log('Status da resposta:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            
            setAvaliacoes(Array.isArray(data) ? data : []);
          } else {
            console.error('Erro na resposta:', response.status, response.statusText);
            setAvaliacoes([]);
          }
        } catch (error) {
          console.error('Erro ao buscar avaliações:', error);
          setAvaliacoes([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAvaliacoesWithParam();
    } else {
      console.log('Nenhum parâmetro encontrado na URL');
      setLoading(false);
    }
  }, [codigo]);




    return (
        <div className="modern-table-container-avaliacoes-aluno">
            <div className="table-header-modern">
                <div className="header-content">
                    <h2 className="table-title-modern"> Avaliações do Usuario</h2>
                    <p className="table-subtitle">Visualize todas as avaliações que o usuario realizou</p>
                </div>
            </div>
            
            <div className="table-content">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th className="th-user">
                                <div className="th-content">
                                    <span>Nome</span>
                                </div>
                            </th>
                            <th className="th-email">
                                <div className="th-content">
                                    <span>Matrícula</span>
                                </div>
                            </th>
                            <th className="th-matricula">
                                <div className="th-content">
                                    <span>Descrição</span>
                                </div>
                            </th>
                            <th className="th-actions">
                                <div className="th-content">
                                    <span>Nota</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Carregando...</td>
                            </tr>
                        ) : avaliacoes.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Nenhuma avaliação encontrada</td>
                            </tr>
                        ) : avaliacoes.map((avaliacao) => (
                            <tr key={avaliacao.id || `${avaliacao.alunoMatricula}-${avaliacao.nota}`} className="table-row-modern">
                                <td className="td-user">
                                    <div className="user-info">
                                       
                                        <div className="user-details">
                                            <span className="user-name">{avaliacao.nome || 'Nome não informado'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-email">
                                    <span className="matricula-badge-as">{avaliacao.alunoMatricula || 'N/A'}</span>
                                </td>
                                <td className="td-matricula">
                                    <span className=" default">{avaliacao.descricao || 'Sem descrição'}</span>
                                </td>
                                <td className="td-actions">
                                    <span className={`nivel-badge ${avaliacao.nota >= 7 ? 'administrador' : avaliacao.nota >= 5 ? 'professor' : 'aluno'}`}>
                                        {avaliacao.nota || 0}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="table-footer-modern">
                <div className="footer-info">
                    <span>Mostrando {avaliacoes.length} avaliações</span>
                </div>
            </div>
        </div>
    );
};

export default TableAvaliacoes;