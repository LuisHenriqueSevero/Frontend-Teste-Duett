import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { loginApi } from "../services/api";

export default function LoginForm({ onRegisterClick }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(email, senha);
      dispatch(loginSuccess(data));
      setError("");
      window.history.pushState(null, "", "/home");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      <p style={{ marginTop: "10px" }}>
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={onRegisterClick}
          style={{
            background: "transparent",
            border: "none",
            color: "#2d89ef",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Cadastrar
        </button>
      </p>
    </form>
  );
}
