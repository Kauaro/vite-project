import axios from "axios";

//const API_URL =  "https://projeto.com.br/"; //remote(produção)
// Para desenvolvimento, vamos usar proxy do Vite em /api → http://localhost:8080
const API_URL = "/api"; //local(desenvolvimento) via proxy

const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data"
  }
});


const httpCommom = {
  mainInstance,
  multipartInstance,
};

export default httpCommom;