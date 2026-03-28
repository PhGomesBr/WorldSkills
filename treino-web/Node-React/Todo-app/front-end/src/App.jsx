import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/tarefas')
      .then(res => res.json())
      .then(dados => setTarefas(dados))
  }, [])

  function adicionarTarefa() {
    if (titulo === '') return

    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo })
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:3000/tarefas')
          .then(res => res.json())
          //Busca a lista atualizada do banco
          .then(dados => setTarefas(dados))
        setTitulo('')
      })
  }
  function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setTarefas(tarefas.filter(t => t.id !== id))
      })
  }
  function concluirTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(() => {
        setTarefas(tarefas.map(t =>
          t.id === id ? { ...t, concluida: t.concluida === 0 ? 1 : 0 } : t
        ))
      })
  }
  return (
    <div>
      <h1>Minhas Tarefas</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul className="lista">
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <span style={{ textDecoration: tarefa.concluida === 1 ? 'line-through' : 'none' }}>
              {tarefa.titulo}
            </span>
            <button className="btn-concluir" onClick={() => concluirTarefa(tarefa.id)}>
              {tarefa.concluida === 1 ? '↩ Desfazer' : '✔ Concluir'}
            </button>
            <button className="btn-deletar" onClick={() => deletarTarefa(tarefa.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App