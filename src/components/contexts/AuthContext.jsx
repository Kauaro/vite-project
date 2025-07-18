
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Dados mockados para demonstração com diferentes tipos de usuário
const mockUsers = [
  // Alunos
  { 
    id: '1', 
    name: 'João Vitor Pucci', 
    email: 'joao@gmail.com', 
    matricula: '90000',
    role: 'aluno',
    password: '123456',
    projetos: ['projeto1', 'projeto2'] // IDs dos projetos que participa
  },
  { 
    id: '2', 
    name: 'Nicoly Naiane', 
    email: 'nicoly@gmail.com', 
    matricula: '90001',
    role: 'aluno',
    password: '123456',
    projetos: ['projeto1']
  },
  // Professores
  { 
    id: '3', 
    name: 'Prof. Elisangela', 
    email: 'elisangela@gmail.com', 
    matricula: '10000',
    role: 'professor',
    password: '123456',
    projetos: ['projeto1', 'projeto3'] // IDs dos projetos que administra
  },
  { 
    id: '4', 
    name: 'Prof. Cruz', 
    email: 'leandro@gmail.com', 
    matricula: '20000',
    role: 'professor',
    password: '123456',
    projetos: ['projeto2']
  },
  // Administradores
  { 
    id: '5', 
    name: 'Admin Kaua', 
    email: 'kaua@gmail.com', 
    matricula: '00001',
    role: 'administrador',
    password: '123456',
    projetos: [] // Administradores podem ver todos os projetos
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (matricula, password) => {
    // Busca usuário por matrícula
    const foundUser = mockUsers.find(u => u.matricula === matricula && u.password === password);
    
    if (foundUser) {
      // Remove a senha antes de salvar no estado
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Funções para verificar permissões
  const isAluno = () => user?.role === 'aluno';
  const isProfessor = () => user?.role === 'professor';
  const isAdministrador = () => user?.role === 'administrador';

  // Função para verificar se o usuário pode acessar um projeto específico
  const canAccessProject = (projectId) => {
    if (!user) return false;
    if (isAdministrador()) return true; // Administradores podem ver todos os projetos
    return user.projetos.includes(projectId);
  };

  // Função para verificar se o usuário pode editar um projeto
  const canEditProject = (projectId) => {
    if (!user) return false;
    if (isAdministrador()) return true; // Administradores podem editar todos os projetos
    if (isProfessor()) return user.projetos.includes(projectId); // Professores só podem editar seus projetos
    return false; // Alunos não podem editar projetos
  };

  // Função para verificar se o usuário pode gerenciar usuários
  const canManageUsers = () => {
    return isAdministrador();
  };

  // Função para verificar se o usuário pode criar projetos
  const canCreateProjects = () => {
    return isProfessor() || isAdministrador();
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isAluno,
      isProfessor,
      isAdministrador,
      canAccessProject,
      canEditProject,
      canManageUsers,
      canCreateProjects
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
};
