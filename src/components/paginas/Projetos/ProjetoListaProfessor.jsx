import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from "react";
import './css/projetolista.css';
import ProjetoService from "../../services/ProjetoService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import TableProjetoProfessor from "../../layout/table/tableprojetoprofessor";

const ProjetosListaProfessor = () => {
    console.log('ProjetoListaProfessor renderizado!');
    const { user, isAluno, isProfessor, isAdministrador, logout, canEditProject } = useAuth();
    const navigate = useNavigate();
    const [projeto, setProjeto] = useState([]);


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



    return (
        
        <>
        
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <Navbar />


        <div className="usuario-container">
            <TableProjetoProfessor />
        </div>
        </>
    );
};

export default ProjetosListaProfessor;