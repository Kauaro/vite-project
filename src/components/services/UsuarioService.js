import http from '../../common/http-common';
const API_URL = "usuario/";

const createUsuario = (usuario) => {
    return api.post("/usuarios", usuario);
};

const getAllUsuarios = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const getById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const UsuarioService = {
    createUsuario,
    getAllUsuarios,
    getById,
}

export default UsuarioService;