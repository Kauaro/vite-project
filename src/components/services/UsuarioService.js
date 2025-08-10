import http from '../../common/http-common';

// Usando proxy do Vite: baseURL = /api/
const API_PREFIX = 'Usuario/';

const createUsuario = (usuario) => {
  // POST /api/Usuario/save → http://localhost:8080/Usuario/save
  return http.mainInstance.post(`${API_PREFIX}save`, usuario);
};

const getAllUsuarios = () => {
  // GET /api/Usuario/findAll
  return http.mainInstance.get(`${API_PREFIX}findAll`);
};

const getById = (id) => {
  // GET /api/Usuario/findById/{id}
  return http.mainInstance.get(`${API_PREFIX}findById/${id}`);
};

const deleteUsuario = (id) => {
  // DELETE /api/Usuario/delete/{id}
  return http.mainInstance.delete(`${API_PREFIX}delete/${id}`);
};

const UsuarioService = {
  createUsuario,
  getAllUsuarios,
  getById,
  deleteUsuario,
};

export default UsuarioService;