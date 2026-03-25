import { useState } from "react";
import "./App.css";

// 1. Componente de Saudação (Roxo)
function Saudacao() {
  return (
    <div
      style={{
        backgroundColor: "#ff00b7b9",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h2 style={{ color: "#000000" }}>Olá, Alunos!</h2>
      <p>Este componente foi criado separadamente</p>
    </div>
  );
}

// 2. Componentes de Vitória (Rosa e Azul)
function Piranhudadavitoria() {
  return (
    <div
      style={{
        backgroundColor: "#ff00b7b9",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h2 style={{ color: "#000000" }}>Olá, Alunos!</h2>
      <p>Este componente foi criado separadamente</p>
    </div>
  );
}

function Vitoriapiranhuda() {
  return (
    <div
      style={{
        backgroundColor: "#ff00b7b9",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h2 style={{ color: "#000000" }}>Olá, Alunos!</h2>
      <p>Este componente foi criado separadamente</p>
    </div>
  );
}

// 3. Componente de Perfil com Props
function Perfil({ teste, cargo }) {
  return (
    <div
      style={{
        backgroundColor: "#803b6c",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "10px",
        color: "white" // Adicionado para melhor leitura no fundo azul
      }}
    >
      <h3 style={{ margin: '0 0 5px 0', color: "#000000" }}>{teste}</h3>
      <p>Nome: {teste}</p>
      <p>Cargo: <strong>{cargo}</strong></p>
    </div>
  ); // Fechamento da div corrigido aqui
}

// 4. Componente Principal
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>

      <div style={{ marginTop: '20px' }}>
        <h1>Minha Primeira Aula de React</h1>
        <hr />

        {/* CHAMADA DOS COMPONENTES */}
        {/* Note que 'Perfil' agora começa com P maiúsculo */}
        <Perfil teste="Vivih" cargo="Olhar a Vitoria Piranhuda" />
        
        <Saudacao />
        <Vitoriapiranhuda />
        <Piranhudadavitoria />
      </div>
    </div>
  );
}

export default App;