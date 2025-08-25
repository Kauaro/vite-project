import httpCommom from '../../common/http-common';

// Serviço para Projetos com API real e fallback para mock
const STORAGE_KEY = 'mockProjetos';

// Dados iniciais de exemplo (fallback)
const projetosIniciais = [
  {
    id: '01',
    nome: 'Projeto Consciência Negra',
    descricao: 'Projeto interdisciplinar sobre a importância da Consciência Negra.',
    professor: 'Prof. Elisangela',
    alunos: ['João Vitor Pucci', 'Nicoly Naiane'],
    tema: 'Consciência Negra'
  },
  {
    id: '02',
    nome: 'Projeto Vozes Silenciadas',
    descricao: 'Projeto de pesquisa sobre minorias e representatividade.',
    professor: 'Prof. Cruz',
    alunos: ['João Vitor Pucci'],
    tema: 'Minorias'
  },
  {
    id: '03',
    nome: 'Projeto Semana da Mulher',
    descricao: 'Ações e debates sobre o papel da mulher na sociedade.',
    professor: 'Prof. Elisangela',
    alunos: [],
    tema: 'Empoderamento Feminino'
  },
];

function getProjetosFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projetosIniciais));
  return projetosIniciais;
}

function saveProjetosToStorage(projetos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
}

const ProjetoService = {
  getAllProjetos: async () => {
    try {
      // Tenta buscar da API real
      const response = await httpCommom.mainInstance.get('/Projeto');
      return response;
    } catch (error) {
      console.log('API não disponível, usando dados mock:', error.message);
      // Fallback para dados mock
      const projetos = getProjetosFromStorage();
      return Promise.resolve({ data: projetos });
    }
  },
  
  getById: async (id) => {
    try {
      const response = await httpCommom.mainInstance.get(`/Projeto/${id}`);
      return response;
    } catch (error) {
      console.log('API não disponível, usando dados mock:', error.message);
      const projetos = getProjetosFromStorage();
      const projeto = projetos.find(p => p.id === id);
      return projeto
        ? Promise.resolve({ data: projeto })
        : Promise.reject(new Error('Projeto não encontrado'));
    }
  },
  
  createProjeto: async (novoProjeto) => {
    try {
      const response = await httpCommom.mainInstance.post('/Projeto', novoProjeto);
      return response;
    } catch (error) {
      console.log('API não disponível, usando dados mock:', error.message);
      const projetos = getProjetosFromStorage();
      const id = `projeto${Date.now()}`;
      const projeto = { ...novoProjeto, id };
      projetos.push(projeto);
      saveProjetosToStorage(projetos);
      return Promise.resolve({ data: projeto });
    }
  },
  
  updateProjeto: async (id, dadosAtualizados) => {
    try {
      const response = await httpCommom.mainInstance.put(`/Projeto/${id}`, dadosAtualizados);
      return response;
    } catch (error) {
      console.log('API não disponível, usando dados mock:', error.message);
      const projetos = getProjetosFromStorage();
      const idx = projetos.findIndex(p => p.id === id);
      if (idx === -1) return Promise.reject(new Error('Projeto não encontrado'));
      projetos[idx] = { ...projetos[idx], ...dadosAtualizados };
      saveProjetosToStorage(projetos);
      return Promise.resolve({ data: projetos[idx] });
    }
  },
  
  deleteProjeto: async (id) => {
    try {
      const response = await httpCommom.mainInstance.delete(`/Projeto/${id}`);
      return response;
    } catch (error) {
      console.log('API não disponível, usando dados mock:', error.message);
      let projetos = getProjetosFromStorage();
      projetos = projetos.filter(p => p.id !== id);
      saveProjetosToStorage(projetos);
      return Promise.resolve();
    }
  },
};

export default ProjetoService; 