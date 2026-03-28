import { useState, useEffect } from 'react';
import './ConsultaApp.css';
const ConsultasApp = () => {
    // Armazena a lista de consultas que vem da API
    const [consulta, setConsulta] = useState([]);
    
    // Estados para controlar os campos do formulário (Inputs Controlados)
    const [paciente, setPaciente] = useState('');
    const [medico, setMedico] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState('');


    // Executa assim que o componente é montado na tela ([])
    useEffect(() => {
        fetch('http://localhost:3000/consultas') // Faz a requisição para o Backend
            .then(res => res.json())            // Converte a resposta para JSON
            .then(data => setConsulta(data));   // Salva os dados no estado 'consulta'
    }, []);



 
    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        fetch('http://localhost:3000/consultas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paciente, medico, data, status }) // Envia os dados do form
        })
        .then(res => res.json())
        .then(novaConsulta => {
            // Atualização Otimista: Adiciona o novo item à lista sem recarregar
            setConsulta((prev) => [...prev, novaConsulta]);
            
            // Limpa os campos do formulário após o envio
            setPaciente(''); setMedico(''); setData(''); setStatus('');
        });
    };

 
    const patchConsulta = (id, novosDados) => {
        fetch(`http://localhost:3000/consultas/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novosDados) // Envia apenas o que mudou (ex: status)
        })
        .then(res => res.json())
        .then(itemAtualizado => {
            // Percorre a lista: se for o ID editado, substitui pelo novo. Se não, mantém o antigo.
            setConsulta(prev => prev.map(item => item.id === id ? itemAtualizado : item));
        });
    };

    
    const deleteConsulta = (id) => {
        fetch(`http://localhost:3000/consultas/${id}`, { method: 'DELETE' })
        .then(() => {
            // Filtra a lista removendo o item que tem o ID deletado
            setConsulta(consulta.filter(c => c.id !== id));
        });
    };

    return (
        <div className="container">
            <h1>Sistema Consulta</h1>
            
            {/* FORMULÁRIO: onSubmit chama a função de criar */}
            <form onSubmit={handleSubmit}>
                {/* onChange: atualiza o estado a cada letra digitada */}
                <input placeholder="Paciente" value={paciente} onChange={e => setPaciente(e.target.value)} />
                <input placeholder="Médico" value={medico} onChange={e => setMedico(e.target.value)} />
                <input type="date" value={data} onChange={e => setData(e.target.value)} />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">Status</option>
                    <option value="agendada">Agendada</option>
                    <option value="concluída">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                </select>
                <button type="submit">Criar</button>
            </form>

            {/* LISTAGEM: Renderização de listas com .map() */}
            <ul>
                {consulta.map(item => (
                    <li key={item.id}>
                        <strong>{item.paciente}</strong> - {item.medico}
                        <br/>{item.data} | {item.status}
                        
                        {/* Botões que passam o ID para as funções de deletar/editar */}
                        <button onClick={() => patchConsulta(item.id, {status: 'concluída'})}>✅ Concluir</button>
                        <button onClick={() => deleteConsulta(item.id)}>🗑️ Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultasApp;