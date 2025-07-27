import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import ProjetoService from '../../services/ProjetoService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Avaliacoes() {
  const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProjetoById, getUsuarioById } = useData();

  const projeto = getProjetoById(id);

  // MOCK DE AVALIAÇÕES FICTÍCIAS
  const avaliacoesFicticias = [
    {
      alunoId: '90001',
      nome: 'João Vitor Pucci',
      matricula: '90000',
      comentario: 'Ótima participação no projeto, sempre colaborativo.',
      nota: 9.5
    },
    {
      alunoId: '90002',
      nome: 'Nicoly Naiane',
      matricula: '90001',
      comentario: 'Demonstrou bom entendimento, mas pode melhorar a comunicação.',
      nota: 8.0
    },
    {
      alunoId: '90003',
      nome: 'Richard Ribeiro',
      matricula: '90002',
      comentario: 'Precisa se dedicar mais às entregas.',
      nota: 6.5
    }
  ];

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
            {avaliacoesFicticias.map((avaliacao, idx) => (
              <tr key={"ficticia-" + idx}>
                <td>{avaliacao.nome}</td>
                <td>{avaliacao.matricula}</td>
                <td>{avaliacao.comentario}</td>
                <td>{avaliacao.nota}</td>
              </tr>
            ))}
            {avaliacoesFicticias.length === 0 && (
              <tr>
                <td colSpan={4}>Nenhuma avaliação encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    </div>       

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

      </div>
  );
}