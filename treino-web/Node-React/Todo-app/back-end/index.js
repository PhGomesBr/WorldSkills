const http = require('http')
const db = require('./banco')

const server = http.createServer((req, res) => {

    //ele vai configurar para receber o CORS e JSON
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Content-Type', 'application/json')

    //o navegador vaio mandar um OPTIONS antes de fazer um PUT/POST/DELETE
    if (req.method === 'OPTIONS') {
        res.writeHead(204/*status code: No Content*/)
        res.end()
        return
    }

    //aqui é o GET. GET /tarefas - listar as tarefas
    if (req.method === 'GET' && req.url === '/tarefas') {
        const tarefas = db.prepare('select * from tarefas').all()
        res.writeHead(200 /*status code:OK*/)
        res.end(JSON.stringify(tarefas))
        return
    }

    //agr fazr o post. POST /tarefas - cria uma nova tarefa
    if (req.method === 'POST' && req.url === '/tarefas') {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            const { titulo } = JSON.parse(body)

            const inserir = db.prepare('INSERT INTO tarefas (titulo) VALUES (?)')
            inserir.run(titulo)

            res.writeHead(201 /*status code: Created */)
            res.end(JSON.stringify({ mensagem: 'Tarefa criada!' }))
        })
        return
    }

    //agr o delete. DELETE /tarefas/1 - deleta pelo id
    if (req.method === 'DELETE' && req.url.startsWith('/tarefas/')) {
        const id = Number(req.url.split('/')[2])

        db.prepare('DELETE FROM tarefas WHERE id = ?').run(id)

        res.writeHead(200)
        res.end(JSON.stringify({ mensagem: 'Tarefa deletada!' }))
        return
    }

    // PUT /tarefas/1 — marca/desmarca como concluída
    if (req.method === 'PUT' && req.url.startsWith('/tarefas/')) {
        const id = Number(req.url.split('/')[2])

        const tarefa = db.prepare('SELECT * FROM tarefas WHERE id = ?').get(id)

        if (!tarefa) {
            res.writeHead(404 /*status code: Not Fund */)
            res.end(JSON.stringify({ mensagem: 'Tarefa não encontrada!' }))
            return
        }

        const novoConcluida = tarefa.concluida === 0 ? 1 : 0
        db.prepare('UPDATE tarefas SET concluida = ? WHERE id = ?').run(novoConcluida, id)

        res.writeHead(200/*status code: OK */)
        res.end(JSON.stringify({ mensagem: 'Tarefa atualizada!' }))
        return
    }    
})

server.listen(3000, () => {
    console.log('✅ API rodando em http://localhost:3000')
})