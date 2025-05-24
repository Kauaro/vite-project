import { useState, useEffect } from "react";
import './Home.css'; // Importe o arquivo CSS
import Semana from '../../img/SEMANA.png';
import Saiba from '../../img/saiba.png';
import Footer from '../../layout/footer/footer.jsx'




const images = [
  "/imagens/vozessilenciadas.png",
  "/imagens/blacklivesmater.jpg",
  "/imagens/saibamais.png",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
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

      {/* Texto principal */}
      <div className="text-container">
        {/* Imagem decorativa esquerda */}
        <img
          src={Saiba}
          alt="Decoração esquerda"
          className="left-decoration"
        />

        {/* Imagem decorativa direita */}
        <img
          src={Semana}
          alt="Decoração direita"
          className="right-decoration"
        />



        <br />
        {/* Texto */}
        <h1 className="main-title">Sobre o Projeto SLA</h1>
        <hr />
        <p className="main-text">
          O <strong>projeto SLA</strong> é uma feira cultural transformadora, criada com o intuito de desafiar e questionar as barreiras que ainda existem em nossa sociedade. Através dessa iniciativa, temas fundamentais, como <strong>racismo</strong>, <strong>homofobia</strong>, <strong>xenofobia</strong>, <strong>preconceito religioso</strong>, entre outros problemas sociais, são abordados de maneira criativa, sensível e educativa. Em vez de simplesmente apresentar esses tópicos de forma teórica, o projeto busca promover uma imersão prática que desperte a conscientização e a reflexão profunda entre os participantes e visitantes.
        </p>
        <p className="main-text-left">
          A proposta da feira é permitir que os alunos se tornem protagonistas do conhecimento e da mudança. Por meio da elaboração de <strong>projetos interdisciplinares</strong>, eles exploram esses temas em profundidade, desenvolvendo soluções criativas e inovadoras que podem ser aplicadas em contextos reais.
        </p>
        <p className="main-text-left">
          As salas de aula, então, se transformam em verdadeiros <strong>cenários interativos</strong>, nos quais os alunos não só expõem suas ideias, mas também se envolvem ativamente com o público, criando experiências de aprendizado que ultrapassam os limites do conteúdo acadêmico tradicional.
        </p>
        <p className="main-text-left">
          Além de estimular a reflexão sobre os <strong>problemas sociais</strong> mais urgentes, o projeto fomenta o diálogo e o entendimento entre diferentes grupos e perspectivas. O respeito, a <strong>empatia</strong> e a <strong>valorização da diversidade cultural</strong> são pilares centrais da feira, que visa construir uma sociedade mais justa e inclusiva, onde todos possam ser ouvidos, respeitados e celebrados por suas diferenças.
        </p>
        <p className="main-text">
          Com essa iniciativa, o <strong>projeto SLA</strong> vai além de uma simples exposição de ideias: ele é um verdadeiro <strong>movimento cultural</strong>, um convite à ação, ao aprendizado contínuo e à construção de um futuro mais harmonioso, baseado no respeito mútuo e na solidariedade. Ao final, os participantes não apenas adquirem mais conhecimento, mas também se tornam agentes de mudança, comprometidos em transformar suas comunidades e a sociedade como um todo.
        </p>

        <br /><br /><br />

        <h2 className="H2Projeto">
          Veja Alguns dos Projetos Disponiveis:
        </h2>

  
        <button className="ButtonProjeto">
          
          Projetos
        </button>

      </div>
    </div>

  );
}
