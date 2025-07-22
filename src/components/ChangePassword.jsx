import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/changepassword.css";

export default function ChangePassword({ onBack }) {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (novaSenha !== confirmacaoNovaSenha) {
      setError("Nova senha e confirmação não coincidem");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/usuarios/alterarsenha",
        {
          senhaAntiga,
          novaSenha,
          confirmacaoNovaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data);
      setSenhaAntiga("");
      setNovaSenha("");
      setConfirmacaoNovaSenha("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Erro ao alterar senha");
      }
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-box">
        {/* Botão voltar */}
        <button className="back-button" onClick={onBack}>⬅ Voltar</button>

        <h2>Alterar Senha</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit} className="change-password-form">
          <div>
            <label>Senha Antiga:</label>
            <input
              type="password"
              value={senhaAntiga}
              onChange={(e) => setSenhaAntiga(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Nova Senha:</label>
            <input
              type="password"
              value={confirmacaoNovaSenha}
              onChange={(e) => setConfirmacaoNovaSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Alterar Senha</button>
        </form>
      </div>
    </div>
  );
}
