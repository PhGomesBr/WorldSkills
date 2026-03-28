const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let dados = []

app.get('/consultas', (req, res) => {
    res.json(dados)
})

app.post('/consultas', (req, res) => {
    // aqui pego os dados q o front envio
    const paciente = req.body.paciente
    const medico = req.body.medico
    const data = req.body.data
    const status = req.body.status

    //criar a conulta obj
    const newConsulta = {
        id: Date.now(),
        paciente: paciente,
        medico: medico,
        data: data,
        status: status,
    }
    //agr colocar no array para salvar
    dados.push(newConsulta)
    //res em json
    res.json(newConsulta)
})

app.patch('/consultas/:id', (req, res) => {
    const id = Number(req.params.id)
    let encontrada = false
    dados = dados.map(con => {
        if (con.id === id) {
            encontrada = true
            return {
                ...con,
                ...req.body
            }
        }

        return con
    })
    if (!encontrada) return res.status(404).json({ mensagem: 'Consulta não encontrada' })

    res.json({ mensagem: 'CONSULTA ATUALIZADA!' })
})

app.delete('/consultas/:id', (req, res) => {
    const id = Number(req.params.id)
    dados = dados.filter(c => c.id !== id)
    res.json({ messagem: 'CONSULTA DELETADA!' })
})

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})
