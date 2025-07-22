import React, { useEffect, useState } from "react";
import { fetchUsersApi, deleteUserApi } from "../services/api";
import "../styles/userlist.css";

export default function UserList({ onBack }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersApi();
      setUsers(data);
      setError("");
    } catch {
      setError("Erro ao buscar usuários. Faça login novamente.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirma a exclusão deste usuário?")) return;
    try {
      await deleteUserApi(id);
      fetchUsers();
    } catch {
      setError("Erro ao excluir usuário");
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h1>Lista de Usuários</h1>
        <button onClick={onBack} className="back-button">← Voltar para Home</button>
      </div>
      <ul className="userlist">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span>{user.nome} - {user.email} ({user.perfil})</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
