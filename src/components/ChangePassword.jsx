import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

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

      // Voltar para home após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Erro ao alterar senha");
      }
    }
  };

  return (
    <div>
      <h2>Alterar Senha</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Senha Antiga:</label><br />
          <input
            type="password"
            value={senhaAntiga}
            onChange={(e) => setSenhaAntiga(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nova Senha:</label><br />
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Nova Senha:</label><br />
          <input
            type="password"
            value={confirmacaoNovaSenha}
            onChange={(e) => setConfirmacaoNovaSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Alterar Senha</button>
      </form>
    </div>
  );
}
