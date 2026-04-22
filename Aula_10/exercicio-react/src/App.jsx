import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  // --- MEUS ESTADOS ---
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("Todas");
  
  // Aqui criei estados auxiliares para a busca e para controlar o modo de edição
  const [searchTerm, setSearchTerm] = useState(""); 
  const [editingId, setEditingId] = useState(null); 
  const [editText, setEditText] = useState("");

  // --- PERSISTÊNCIA DE DADOS ---
  // Usei o useEffect para carregar o que está no LocalStorage assim que o app inicia
  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  // Monitoro a taskList: qualquer mudança nela, eu atualizo o LocalStorage automaticamente
  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

  // --- FUNÇÕES DE MANIPULAÇÃO ---
  
  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return; // Validação básica para não salvar tarefa vazia

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList([newTask, ...taskList]);
    setTaskText(""); // Limpo o input após criar
  };

  const toggleTask = (id) => {
    // Uso o map para criar um novo array respeitando a imutabilidade do React
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    // Implementei um confirm nativo antes de deletar, boa prática de UX
    if (window.confirm("Certeza que quer apagar essa tarefa?")) {
      setTaskList(taskList.filter(t => t.id !== id));
    }
  };

  // Funções que criei para gerenciar a edição de texto das tarefas
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTaskList(taskList.map(t => 
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditingId(null); // Saio do modo de edição
  };

  // --- LÓGICA DE FILTRO E ORDENAÇÃO (O "CÉREBRO" DO APP) ---
  // Usei o useMemo para não reprocessar a lista inteira a cada renderização à toa.
  // Performance aqui é prioridade!
  const filteredAndSortedTasks = useMemo(() => {
    // 1º Passo: Filtro por status (Concluída/Pendente) e por busca de texto
    let result = taskList.filter(t => {
      const matchesFilter = filter === "Todas" ? true : (filter === "Pendentes" ? !t.completed : t.completed);
      const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    // 2º Passo: Ordenação Automática por Prioridade
    // Criei um "peso" para cada nível para o .sort() colocar as Altas no topo
    const priorityWeight = { "Alta": 3, "Média": 2, "Baixa": 1 };
    
    return result.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  }, [taskList, filter, searchTerm]);

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      {/* Seção de entrada de dados */}
      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="O que precisa ser feito?"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* Campo de Busca em Tempo Real que implementei */}
      <section className="search-section">
        <input 
          type="text" 
          placeholder="🔍 Pesquisar tarefas..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {/* Filtros de Status */}
      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Grid de Tarefas */}
      <main className="task-grid">
        {filteredAndSortedTasks.map(item => (
          <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}>
            <div className="task-content">
              {/* Lógica de Edição: Se estiver editando, mostra input, se não, mostra h3 */}
              {editingId === item.id ? (
                <input 
                  className="edit-input"
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(item.id)} // Salva se o usuário clicar fora
                  autoFocus
                />
              ) : (
                <h3>{item.text}</h3>
              )}
              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>
            
            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? "Reabrir" : "Concluir"}
              </button>
              
              <button onClick={() => editingId === item.id ? saveEdit(item.id) : startEditing(item)}>
                {editingId === item.id ? "Salvar" : "Editar"}
              </button>

              <button onClick={() => deleteTask(item.id)} className="delete">
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;