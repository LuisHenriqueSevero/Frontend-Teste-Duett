import React, { useState } from "react";
import { registerApi } from "../services/api";

export default function RegisterForm({ onSuccess }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("Usuario");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validação básica de CPF: deve ter 11 dígitos numéricos
  const isValidCpf = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits.length === 11;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidCpf(cpf)) {
      setError("CPF inválido. Deve conter 11 dígitos numéricos.");
      setSuccess("");
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
      onSuccess();
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const msg = typeof data === "string" ? data : data.message || JSON.stringify(data);

        if (msg.toLowerCase().includes("email")) {
          setError("Erro: Email já cadastrado.");
        } else if (msg.toLowerCase().includes("cpf")) {
          setError("Erro: CPF já cadastrado.");
        } else {
          setError("Erro ao cadastrar usuário.");
        }
      } else {
        setError("Erro ao cadastrar usuário.");
      }
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastrar Usuário</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

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
        onChange={(e) => setCpf(e.target.value)}
        maxLength={14} // para facilitar com pontos e traço se quiser adicionar depois
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

      <button type="submit">Cadastrar</button>
    </form>
  );
}
