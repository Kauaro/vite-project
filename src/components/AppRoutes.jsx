import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Home from './paginas/Home/Home.jsx';
import Login from "./paginas/Login/login.jsx"
import Usuario from "./paginas/Usuario/Usuario"
import UsuarioEditar from "./paginas/Usuario/UsuarioEditar"
import UsuarioNovo from "./paginas/Usuario/UsuarioNovo"
import UsuariosLista from "./paginas/Usuario/UsuariosLista"
import AlunosLista from "./paginas/Alunos/AlunosLista"
import ProjetoEditar from "./paginas/Projetos/ProjetoEditar"
import ProjetoNovo from "./paginas/Projetos/ProjetoNovo"
import ProjetosLista from "./paginas/Projetos/ProjetosLista"
import Avaliacoes from "./paginas/Avaliacoes/Avaliacoes"
import AvaliacoesAluno from "./paginas/Avaliacoes/AvaliacoesAluno"

// Componente para redirecionar baseado no tipo de usuário
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'aluno':
      return <Navigate to="/home" replace />;
    case 'professor':
      return <Navigate to="/home" replace />;
    case 'administrador':
      return <Navigate to="/homeadm" replace />;
    default:
      return <Navigate to="/home" replace />;
  }
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rota raiz - redireciona baseado no tipo de usuário */}
      <Route path="/" element={<RoleBasedRedirect />} />
      
      {/* Rotas de login */}
      <Route path="/login" element={<Login />} />


      {/* Rotas para todos os usuários autenticados */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      <Route path="/avaliacoes/:id" element={
        <ProtectedRoute allowedRoles={['professor', 'administrador', 'aluno']}>
          <Avaliacoes />
        </ProtectedRoute>
      } />

      {/* Rotas de usuários - apenas administradores */}
      <Route path="/usuario" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <Usuario />
        </ProtectedRoute>
      } />
      <Route path="/usuarioslista" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <UsuariosLista />
        </ProtectedRoute>
      } />
      <Route path="/usuarionovo" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <UsuarioNovo />
        </ProtectedRoute>
      } />
      <Route path="/usuarioeditar/:id" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <UsuarioEditar />
        </ProtectedRoute>
      } />

      {/* Rotas de alunos - apenas administradores */}
      <Route path="/alunoslista" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <AlunosLista />
        </ProtectedRoute>
      } />

      <Route path="/avaliacoesaluno/:matricula" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <AvaliacoesAluno />
        </ProtectedRoute>
      } />

      {/* Rotas de projetos - professores e administradores */}
      
      <Route path="/projetoslista" element={
        <ProtectedRoute allowedRoles={['professor', 'administrador', 'aluno']}>
          <ProjetosLista />
        </ProtectedRoute>
      } />
      <Route path="/projetonovo" element={
        <ProtectedRoute allowedRoles={['professor', 'administrador']}>
          <ProjetoNovo />
        </ProtectedRoute>
      } />
      <Route path="/projetoeditar/:id" element={
        <ProtectedRoute allowedRoles={['professor', 'administrador']}>
          <ProjetoEditar />
        </ProtectedRoute>
      } />

      {/* Rota de fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
