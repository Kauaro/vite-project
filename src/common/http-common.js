import axios from "axios";

//const API_URL =  "https://projeto.com.br/"; //remote(produção)
// Para desenvolvimento, vamos usar proxy do Vite em /api → http://localhost:8080
const API_URL = "/api"; //local(desenvolvimento) via proxy

const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 10000, // 10 segundos de timeout
});

const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data"
  },
  timeout: 30000, // 30 segundos para uploads
});

// Interceptor para logs de requisição
mainInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requisição para: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logs de resposta
mainInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta de: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

const httpCommom = {
  mainInstance,
  multipartInstance,
};

export default httpCommom;