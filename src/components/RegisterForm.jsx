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

    const cpfClean = cpf.replace(/\D/g, "");

    if (cpfClean.length !== 11) {
      setError("CPF inválido. Deve conter exatamente 11 números.");
      return;
    }

    try {
      await registerApi({
        nome,
        email,
        cpf: cpfClean,
        senha,
        perfil,
      });
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

  const handleCpfChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setCpf(onlyNumbers);
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
        ⬅ Voltar
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
        placeholder="CPF (somente números)"
        value={cpf}
        onChange={handleCpfChange}
        maxLength={11}
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
