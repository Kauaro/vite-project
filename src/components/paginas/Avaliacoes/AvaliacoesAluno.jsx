import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import Table from "../../layout/table/tableavaliacaoaluno"

export default function AvaliacoesAluno() {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
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

    /*

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
    }; */

    if (matricula) {
      fetchAvaliacoes();
    }
  }, [matricula]);  

  return (

    <>

    <Navbar />  
    <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />

    <div className="avaliacoes-container">
      
        <Table />
      </div>
    
    </>
  );
}
