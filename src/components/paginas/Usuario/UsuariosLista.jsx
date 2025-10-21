import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/UsuariosLista.css';
import UsuarioService from "../../services/UsuarioService";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/navbar/navbar";
import Table from "../../layout/table/table"

const UsuariosLista = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};




    return (

        <>
        <Navbar />  
            {/* Seção de boas-vindas personalizada */}
        <Sidebar user={user} isAluno={isAluno} isProfessor={isProfessor} isAdministrador={isAdministrador} />
        <div className="usuario-container">
           <Table />
        </div>
        </>
    );
};

export default UsuariosLista;
