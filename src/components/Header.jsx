import React from "react";
import "../styles/header.css";

export default function Header({ onGoTo, onLogout }) {
  return (
    <header className="app-header">
      <div className="left-buttons">
        <button onClick={() => onGoTo("/admin")}>Lista de Usuários</button>
        <button onClick={() => onGoTo("/alterar-senha")}>Alterar Senha</button>
      </div>
      <div className="title">
        <h1>Teste Software Duett</h1>
      </div>
      <div className="right-buttons">
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
