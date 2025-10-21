import './Avaliacoes.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import '../Projetos/ProjetosLista'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import Tabela from "../../layout/table/TableAvaliacoes";


export default function Avaliacoes() {
  const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { codigo } = useParams();
  const { getProjetoById, getUsuarioById } = useData();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const projeto = getProjetoById(id);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Avaliacao/codigo/${codigo}`);
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

    <>

    <Navbar />
    <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />

      <div className="avaliacoes-container">
            
            <Tabela />

      </div>

      </>
  );
}