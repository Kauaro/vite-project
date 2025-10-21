import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import './Table.css';

const TableAvaliacoesAluno = () => {
    const { user } = useAuth();
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

    if (matricula) {
      fetchAvaliacoes();
    }
  }, [matricula]);




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
                            <th className="th-nivel">
                                <div className="th-content">
                                    <span>Código Projeto</span>
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
                        {avaliacoes.map((avaliacao, index) => (
                            <tr key={index} className="table-row-modern">
                                <td className="td-user">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {avaliacao.nome ? avaliacao.nome.charAt(0).toUpperCase() : 'A'}
                                        </div>
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
                                <td className="td-nivel">
                                    <span className="nivel-badge default">
                                        {avaliacao.projetoNome || 'N/A'}
                                    </span>
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

export default TableAvaliacoesAluno;