import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import './css/projetolista.css';
import ProjetoService from "../../services/ProjetoService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import Table from "../../layout/table/tableprojeto";

const ProjetosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout, canEditProject } = useAuth();
    const navigate = useNavigate();
    const [projeto, setProjeto] = useState([]);

        useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });


    const fetchProjeto = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Projeto');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            setProjeto(Array.isArray(data) ? data : data.projeto || []);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            setProjeto([]);
        }
    };

    useEffect(() => {
        fetchProjeto();
    }, []);

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};
    const handleEditar = (id) => {
        navigate(`/projetoeditar/${id}`);
    };

    const handleAvalia = (id) => {
        navigate(`/avaliacoes/${id}`);
    };

    const handleCadastrar = () => {
        navigate('/projetonovo');
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await ProjetoService.deleteProjeto(id);
                setProjeto(projeto.filter(p => p.id !== id));
            } catch (error) {
                console.error('Erro ao excluir projeto:', error);
                alert('Erro ao excluir projeto. Tente novamente.');
            }
        }
    };

    return (
        
        <>
        
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <Navbar />


        <div className="usuario-container">
            <Table />
        </div>
        </>
    );
};

export default ProjetosLista;