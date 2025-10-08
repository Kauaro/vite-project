import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';


const images = [
  "/imagens/vozessilenciadas.png",
  "/imagens/blacklivesmater.jpg",
  "/imagens/saibamais.png",
];

export default function Home() {
  const { user, isAluno, isProfessor, isAdministrador } = useAuth();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  return (
      
      <div className="home-container">
        <div className="welcome-section">
          <h2>Bem-vindo(a), {user?.nome}!</h2>
          <p className="user-role">
            {isAluno() && "🎓 Aluno"}
            {isProfessor() && "👨‍🏫 Professor"}
            {isAdministrador() && "⚙️ Administrador"}
          </p>
        </div>

          {/* Botão de sair no canto superior direito */}
          <div className="logout-top-right">
              
              <Link to="/login" className="logout-button-top">
                  <span className="logout-icon">🚪</span>
                  Sair
              </Link>
          </div>

        {/* Carrossel */}
      <div className="carousel-container">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i}`}
            className={`carousel-image ${i === index ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="main-text">
        <h1 >Sobre o Projeto SLA</h1>
        <p>O Projeto SLA é uma feira cultural que promove a reflexão e o enfrentamento de questões sociais como racismo,</p>
        <p>homofobia, xenofobia e preconceito religioso. Com uma abordagem prática, criativa e educativa, os alunos se</p>
        <p>tornam protagonistas, desenvolvendo projetos interdisciplinares e interativos que transformam as salas de aula</p>
        <p>em espaços de conscientização. A iniciativa valoriza o respeito, a empatia e a diversidade, incentivando o diálogo</p>
        <p>e a construção de uma sociedade mais justa e inclusiva. Mais do que uma exposição, o SLA é um movimento de</p>
        <p>transformação social e formação de agentes de mudança.</p>
        </div>

        {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="quick-access-wrapper-home">
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

  );
}
