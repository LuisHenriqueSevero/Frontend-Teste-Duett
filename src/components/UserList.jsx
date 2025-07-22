import React, { useEffect, useState } from "react";
import { fetchUsersApi, deleteUserApi } from "../services/api";

export default function UserList() {
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
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.nome} - {user.email} ({user.perfil})</span>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
