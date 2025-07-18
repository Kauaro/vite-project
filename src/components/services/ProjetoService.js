// Serviço mock para Projetos
const STORAGE_KEY = 'mockProjetos';

// Dados iniciais de exemplo
const projetosIniciais = [
  {
    id: '01',
    nome: 'Projeto Consciência Negra',
    descricao: 'Projeto interdisciplinar sobre a importância da Consciência Negra.',
    professor: 'Prof. Elisangela',
    alunos: ['João Vitor Pucci', 'Nicoly Naiane'],
  },
  {
    id: '02',
    nome: 'Projeto Vozes Silenciadas',
    descricao: 'Projeto de pesquisa sobre minorias e representatividade.',
    professor: 'Prof. Cruz',
    alunos: ['João Vitor Pucci'],
  },
  {
    id: '03',
    nome: 'Projeto Semana da Mulher',
    descricao: 'Ações e debates sobre o papel da mulher na sociedade.',
    professor: 'Prof. Elisangela',
    alunos: [],
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
  getAllProjetos: () => {
    return Promise.resolve({ data: getProjetosFromStorage() });
  },
  getById: (id) => {
    const projetos = getProjetosFromStorage();
    const projeto = projetos.find(p => p.id === id);
    return projeto
      ? Promise.resolve({ data: projeto })
      : Promise.reject(new Error('Projeto não encontrado'));
  },
  createProjeto: (novoProjeto) => {
    const projetos = getProjetosFromStorage();
    const id = `projeto${Date.now()}`;
    const projeto = { ...novoProjeto, id };
    projetos.push(projeto);
    saveProjetosToStorage(projetos);
    return Promise.resolve({ data: projeto });
  },
  updateProjeto: (id, dadosAtualizados) => {
    const projetos = getProjetosFromStorage();
    const idx = projetos.findIndex(p => p.id === id);
    if (idx === -1) return Promise.reject(new Error('Projeto não encontrado'));
    projetos[idx] = { ...projetos[idx], ...dadosAtualizados };
    saveProjetosToStorage(projetos);
    return Promise.resolve({ data: projetos[idx] });
  },
  deleteProjeto: (id) => {
    let projetos = getProjetosFromStorage();
    projetos = projetos.filter(p => p.id !== id);
    saveProjetosToStorage(projetos);
    return Promise.resolve();
  },
};

export default ProjetoService; 