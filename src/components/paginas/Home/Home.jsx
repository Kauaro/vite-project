import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';
import Navbar from '../../layout/navbar/navbar';
import Sidebar from '../../layout/Sidebar/Sidebar';

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
        

        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />

          

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

        <Navbar />

      </div>

  );
}
