import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { loginApi } from "../services/api";
import "../styles/loginform.css";

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
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
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
      <button type="submit" className="submit-button">
        Entrar
      </button>
      <p className="register-text">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={onRegisterClick}
          className="register-button"
        >
          Cadastrar
        </button>
      </p>
    </form>
  );
}
