import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/app.css";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserList from "./components/UserList";
import ChangePassword from "./components/ChangePassword";
import { logout } from "./store/authSlice";

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [page, setPage] = useState(window.location.pathname);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const onPopState = () => setPage(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goTo = (path) => {
    window.history.pushState(null, "", path);
    setPage(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    goTo("/");
  };

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <RegisterForm
          onSuccess={() => setShowRegister(false)}
          onBack={() => setShowRegister(false)}
        />
      );
    }
    return <LoginForm onRegisterClick={() => setShowRegister(true)} />;
  }

  if (page === "/admin") {
    if (user.perfil !== "Administrador") {
      return (
        <div className="access-denied-container">
          <p>⚠️ Acesso negado: Apenas administradores podem ver esta página.</p>
          <button onClick={() => goTo("/home")}>Voltar</button>
        </div>
      );
    }
    return (
      <>
        <UserList onBack={() => goTo("/home")} />
      </>
    );
  }

  if (page === "/alterar-senha") {
    return (
      <ChangePassword onBack={() => goTo("/home")} />
    );
  }

  return (
    <div className="home-container">
      <h1>Hola Mundo!</h1>
      <p>
        Bem-vindo, {user.nome} ({user.perfil})
      </p>
      <div className="button-group">
        <button onClick={() => goTo("/admin")}>Ir para Lista de Usuários</button>
        <button onClick={() => goTo("/alterar-senha")}>Alterar Senha</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
