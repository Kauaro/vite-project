import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/login' }) => {
  const { user, isAuthenticated } = useAuth();

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se não há restrições de role, permite acesso
  if (allowedRoles.length === 0) {
    return children;
  }

  // Verifica se o usuário tem uma das roles permitidas
  if (allowedRoles.includes(user.role)) {
    return children;
  }

  // Se não tem permissão, redireciona para home
  return <Navigate to="/home" replace />;
};

export default ProtectedRoute; 