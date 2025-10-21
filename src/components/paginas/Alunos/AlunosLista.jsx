import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/AlunosLista.css';
import AlunoService from "../../services/AlunoService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import Table from "../../layout/table/tableapp"

const AlunosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState([]);

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    const handleEditar = (matricula) => {
        if (matricula) {
            navigate(`/alunoeditar/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno para edição.');
        }
    };

    const handleAvaliacoes = (matricula) => {
        if (matricula) {
            navigate(`/avaliacoesaluno/${matricula}`);
        } else {
            alert('Erro: Não foi possível identificar o aluno.');
        }
    };

    const handleExcluir = async (matricula) => {
        if (!matricula) {
            alert('Erro: Não foi possível identificar o aluno para exclusão.');
            return;
        }
        
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                await AlunoService.deleteAluno(matricula);
                alert("Aluno excluído com sucesso!");
                // Atualiza a lista de alunos sem recarregar a página
                fetchAluno();
            } catch (error) {
                console.error("Erro ao excluir aluno:", error);
                alert("Erro ao excluir aluno. Tente novamente.");
            }
        }
    };

    const fetchAluno = async () => {
        try {
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Aluno');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setAluno(data);
            } else {
                const aluno = data.aluno || [];
                setAluno(aluno);
            }
        } catch (error) {
            console.log('Erro ao buscar alunos:', error);
        }
    };

    useEffect(() => {
        fetchAluno();
    }, []);

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

export default AlunosLista;
