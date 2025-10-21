import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (matricula, senha) => {
  try {
    const response = await fetch("https://productclienthub-ld2x.onrender.com/api/Usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matricula, senha })
    });

    if (!response.ok) {
      return { success: false, message: "Matrícula ou senha incorretos." };
    }

    const data = await response.json();

    const loggedUser = {
      id: data.id,
      matricula: data.matricula,
      nome: data.nome,
      role: data.role?.toLowerCase(), // ✅ garante que role fique minúsculo
      projetos: data.projetos || []
    };

    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser)); // ✅ usa sempre a mesma chave

    return { success: true, message: data.message || "Login realizado com sucesso!" };
  } catch (err) {
    console.error("Erro no login:", err);
    return { success: false, message: "Erro no servidor." };
  }
};


  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Funções de permissão
  const isAluno = () => user?.role === 'aluno';
  const isProfessor = () => user?.role === 'professor';
  const isAdministrador = () => user?.role === 'administrador';

  const canAccessProject = (projectId) => {
    if (!user) return false;
    if (isAdministrador()) return true;
    return user.projetos.includes(projectId);
  };

  const canEditProject = (projectId) => {
    if (!user) return true;
    if (isAdministrador()) return true;
    if (isProfessor()) return user.projetos.includes(projectId);
    return false;
  };

  const canManageUsers = () => isAdministrador();

  const canCreateProjects = () => isProfessor() || isAdministrador();

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
