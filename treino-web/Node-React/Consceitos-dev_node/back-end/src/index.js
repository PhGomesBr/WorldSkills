const express = require('express');
const app = express();

app.use(express.json())
/* 
 metodos http:
  GET: Buscar informações do back-end 
  POST: Criar uma informação no back-end
  PUT/PATCH: Alterar uma informação no back-end
  DELETE: Deletar um informação no back-end 
*/

/*
Tipos de parametro:
    Query Params: Filtros e Paginações
    Route Params: Identificar um recurso na hora de atualizar ou deletar
    Request Body: Conteudo na hora de criar ou editar um recurso (json)
*/


const projects = [];

app.get('/projects', (req, res) => {
    return res.json(projects);
})


app.post('/projects', (req, res) => {
    const { title, owner } = req.body;
    const project = {
        id: Date.now(), title, owner
    };

    projects.push(project);
})

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    return res.json([
        'projeto 4',
        'projeto 2',
        'projeto 3',
    ])
})

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    return res.json([
        'projeto 2',
        'projeto 3',
    ])
})

app.listen(3333, () => {
    console.log('🚀🚀 BackEnd started! porta 3333')
});