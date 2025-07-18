
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

// Dados mockados de projetos
const mockProjetos = [
  {
    id: 'projeto1',
    nome: 'Projeto Anti-Racismo',
    descricao: 'Projeto para conscientização sobre racismo na sociedade',
    professor: 'Prof. Carlos Oliveira',
    professorId: '3',
    alunos: ['1', '2'], // IDs dos alunos participantes
    status: 'ativo',
    dataCriacao: '2024-01-15',
    avaliacoes: [
      { alunoId: '1', nota: 8.5, comentario: 'Excelente participação' },
      { alunoId: '2', nota: 7.8, comentario: 'Bom trabalho' }
    ]
  },
  {
    id: 'projeto2',
    nome: 'Projeto Diversidade Cultural',
    descricao: 'Explorando a diversidade cultural brasileira',
    professor: 'Prof. Ana Costa',
    professorId: '4',
    alunos: ['1'], // IDs dos alunos participantes
    status: 'ativo',
    dataCriacao: '2024-02-01',
    avaliacoes: [
      { alunoId: '1', nota: 9.0, comentario: 'Trabalho excepcional' }
    ]
  },
  {
    id: 'projeto3',
    nome: 'Projeto Inclusão Digital',
    descricao: 'Tecnologia para todos',
    professor: 'Prof. Carlos Oliveira',
    professorId: '3',
    alunos: [], // IDs dos alunos participantes
    status: 'ativo',
    dataCriacao: '2024-02-10',
    avaliacoes: []
  } 
];

// Dados mockados de usuários
const mockUsuarios = [
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


export const DataProvider = ({ children }) => {
  const [projetos, setProjetos] = useState(mockProjetos);
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const { user, isAluno, isProfessor, isAdministrador } = useAuth();

  // Função para obter projetos baseado no tipo de usuário
  const getProjetos = () => {
    if (!user) return [];

    if (isAdministrador()) {
      // Administradores veem todos os projetos
      return projetos;
    } else if (isProfessor()) {
      // Professores veem apenas os projetos que administram
      return projetos.filter(projeto => projeto.professorId === user.id);
    } else if (isAluno()) {
      // Alunos veem apenas os projetos em que participam
      return projetos.filter(projeto => projeto.alunos.includes(user.id));
    }

    return [];
  };

  // Função para obter usuários (apenas para administradores)
  const getUsuarios = () => {
    if (!isAdministrador()) return [];
    return usuarios;
  };

  // Função para criar novo projeto
  const criarProjeto = (novoProjeto) => {
    if (!isProfessor() && !isAdministrador()) {
      throw new Error('Sem permissão para criar projetos');
    }

    const projeto = {
      ...novoProjeto,
      id: `projeto${Date.now()}`,
      professor: user.name,
      professorId: user.id,
      alunos: [],
      status: 'ativo',
      dataCriacao: new Date().toISOString().split('T')[0],
      avaliacoes: []
    };

    setProjetos(prev => [...prev, projeto]);
    return projeto;
  };

  // Função para editar projeto
  const editarProjeto = (id, dadosAtualizados) => {
    if (!isProfessor() && !isAdministrador()) {
      throw new Error('Sem permissão para editar projetos');
    }

    if (isProfessor()) {
      const projeto = projetos.find(p => p.id === id);
      if (projeto.professorId !== user.id) {
        throw new Error('Você só pode editar seus próprios projetos');
      }
    }

    setProjetos(prev => 
      prev.map(projeto => 
        projeto.id === id ? { ...projeto, ...dadosAtualizados } : projeto
      )
    );
  };

  // Função para adicionar aluno a um projeto
  const adicionarAlunoAoProjeto = (projetoId, alunoId) => {
    if (!isProfessor() && !isAdministrador()) {
      throw new Error('Sem permissão para adicionar alunos');
    }

    if (isProfessor()) {
      const projeto = projetos.find(p => p.id === projetoId);
      if (projeto.professorId !== user.id) {
        throw new Error('Você só pode adicionar alunos aos seus projetos');
      }
    }

    setProjetos(prev => 
      prev.map(projeto => 
        projeto.id === projetoId 
          ? { ...projeto, alunos: [...projeto.alunos, alunoId] }
          : projeto
      )
    );
  };

  // Função para avaliar aluno
  const avaliarAluno = (projetoId, alunoId, nota, comentario) => {
    if (!isProfessor() && !isAdministrador()) {
      throw new Error('Sem permissão para avaliar alunos');
    }

    if (isProfessor()) {
      const projeto = projetos.find(p => p.id === projetoId);
      if (projeto.professorId !== user.id) {
        throw new Error('Você só pode avaliar alunos dos seus projetos');
      }
    }

    const avaliacao = { alunoId, nota, comentario };

    setProjetos(prev => 
      prev.map(projeto => 
        projeto.id === projetoId 
          ? { 
              ...projeto, 
              avaliacoes: [
                ...projeto.avaliacoes.filter(a => a.alunoId !== alunoId),
                avaliacao
              ]
            }
          : projeto
      )
    );
  };

  // Função para criar novo usuário (apenas administradores)
  const criarUsuario = (novoUsuario) => {
    if (!isAdministrador()) {
      throw new Error('Apenas administradores podem criar usuários');
    }

    const usuario = {
      ...novoUsuario,
      id: Date.now().toString(),
      status: 'ativo',
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    setUsuarios(prev => [...prev, usuario]);
    return usuario;
  };

  // Função para editar usuário (apenas administradores)
  const editarUsuario = (id, dadosAtualizados) => {
    if (!isAdministrador()) {
      throw new Error('Apenas administradores podem editar usuários');
    }

    setUsuarios(prev => 
      prev.map(usuario => 
        usuario.id === id ? { ...usuario, ...dadosAtualizados } : usuario
      )
    );
  };

  return (
    <DataContext.Provider value={{
      projetos: getProjetos(),
      usuarios: getUsuarios(),
      criarProjeto,
      editarProjeto,
      adicionarAlunoAoProjeto,
      avaliarAluno,
      criarUsuario,
      editarUsuario,
      // Funções auxiliares
      getProjetoById: (id) => projetos.find(p => p.id === id),
      getUsuarioById: (id) => usuarios.find(u => u.id === id),
      getAvaliacaoAluno: (projetoId, alunoId) => {
        const projeto = projetos.find(p => p.id === projetoId);
        return projeto?.avaliacoes.find(a => a.alunoId === alunoId);
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro do DataProvider');
  }
  return context;
};
