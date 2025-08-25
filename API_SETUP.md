# Configuração da API para Projetos

## Problema Atual
A aplicação está tentando conectar com uma API em `http://localhost:8080/api/Projeto` que não está funcionando.

## Soluções

### 1. **Solução Imediata (Recomendada)**
A aplicação agora funciona com dados mock (demonstração) enquanto a API não estiver disponível.

### 2. **Configurar API Real**

#### Opção A: Backend Java/Spring Boot
Se você tem um backend Java, crie um controller:

```java
@RestController
@RequestMapping("/api")
public class ProjetoController {
    
    @GetMapping("/Projeto")
    public List<Projeto> getAllProjetos() {
        // Retorna lista de projetos
    }
    
    @GetMapping("/Projeto/{id}")
    public Projeto getProjetoById(@PathVariable Long id) {
        // Retorna projeto por ID
    }
    
    @PostMapping("/Projeto")
    public Projeto createProjeto(@RequestBody Projeto projeto) {
        // Cria novo projeto
    }
    
    @PutMapping("/Projeto/{id}")
    public Projeto updateProjeto(@PathVariable Long id, @RequestBody Projeto projeto) {
        // Atualiza projeto
    }
    
    @DeleteMapping("/Projeto/{id}")
    public void deleteProjeto(@PathVariable Long id) {
        // Remove projeto
    }
}
```

#### Opção B: Backend Node.js/Express
```javascript
const express = require('express');
const app = express();

app.get('/api/Projeto', (req, res) => {
    // Retorna lista de projetos
});

app.get('/api/Projeto/:id', (req, res) => {
    // Retorna projeto por ID
});

app.post('/api/Projeto', (req, res) => {
    // Cria novo projeto
});

app.put('/api/Projeto/:id', (req, res) => {
    // Atualiza projeto
});

app.delete('/api/Projeto/:id', (req, res) => {
    // Remove projeto
});
```

### 3. **Estrutura de Dados Esperada**
A API deve retornar projetos no formato:

```json
[
  {
    "id": "1",
    "nome": "Nome do Projeto",
    "descricao": "Descrição do projeto",
    "tema": "Tema do projeto",
    "professor": "Nome do Professor",
    "alunos": ["Aluno 1", "Aluno 2"]
  }
]
```

### 4. **Verificar Configuração**
- Certifique-se de que o backend está rodando na porta 8080
- Verifique se a rota `/api/Projeto` está funcionando
- Teste com Postman ou similar: `GET http://localhost:8080/api/Projeto`

### 5. **Logs da Aplicação**
A aplicação agora mostra logs no console:
- 🚀 Requisições sendo feitas
- ✅ Respostas bem-sucedidas
- ❌ Erros de conexão

## Status Atual
✅ Aplicação funcionando com dados mock
✅ Tratamento de erros implementado
✅ Fallback automático para dados de demonstração
⚠️ API real precisa ser configurada

## Próximos Passos
1. Configure seu backend na porta 8080
2. Implemente as rotas da API
3. Teste a conexão
4. A aplicação automaticamente usará a API quando disponível
