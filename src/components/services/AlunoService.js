import http from '../../common/http-common';

// Usando proxy do Vite: baseURL = /api/
const API_PREFIX = 'Aluno/';

const createAluno = (aluno) => {
  // POST /api/Aluno/save → http://localhost:8080/Aluno/save
  return http.mainInstance.post(`${API_PREFIX}save`, aluno);
};

const getAllAlunos = () => {
  // GET /api/Aluno/findAll
  return http.mainInstance.get(`${API_PREFIX}findAll`);
};

const getByMatricula = (matricula) => {
  // GET /api/Aluno/findByMatricula/{matricula}
  return http.mainInstance.get(`${API_PREFIX}findByMatricula/${matricula}`);
};

const updateAluno = (matricula, dadosAtualizados) => {
  // PUT /api/Aluno/update/{matricula}
  return http.mainInstance.put(`${API_PREFIX}update/${matricula}`, dadosAtualizados);
};

const deleteAluno = (id) => {
  // DELETE /api/Aluno/delete/{matricula}
  return http.mainInstance.delete(`${API_PREFIX}${id}`);
};

const AlunoService = {
  createAluno,
  getAllAlunos,
  getByMatricula,
  updateAluno,
  deleteAluno,
};

export default AlunoService;
