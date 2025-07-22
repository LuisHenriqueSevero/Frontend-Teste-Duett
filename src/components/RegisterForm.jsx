import React, { useState } from "react";
import { registerApi } from "../services/api";

export default function RegisterForm({ onSuccess, onBack }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("Usuario");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação básica de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      setError("CPF inválido. Use o formato XXXXXXXXXXX");
      return;
    }

    try {
      await registerApi({ nome, email, cpf, senha, perfil });
      setSuccess("Usuário cadastrado com sucesso!");
      setError("");
      setNome("");
      setEmail("");
      setCpf("");
      setSenha("");
      setPerfil("Usuario");
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err.response?.data || "Erro ao cadastrar usuário";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          background: "transparent",
          border: "none",
          fontSize: "1.2em",
          cursor: "pointer",
          color: "#2d89ef",
        }}
      >
        Voltar
      </button>

      <h2 style={{ marginTop: "2em" }}>Cadastrar Usuário</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="CPF (XXXXXXXXXXX)"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
        <option value="Usuario">Usuário</option>
        <option value="Administrador">Administrador</option>
      </select>

      <button type="submit" style={{ marginTop: "10px" }}>
        Cadastrar
      </button>
    </form>
  );
}
