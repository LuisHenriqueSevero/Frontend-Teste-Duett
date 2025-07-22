import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserList from "./components/UserList";
import ChangePassword from "./components/ChangePassword"; // importe o componente
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
        <>
          <RegisterForm onSuccess={() => setShowRegister(false)} />
          <button onClick={() => setShowRegister(false)}>Voltar ao Login</button>
        </>
      );
    }
    return (
      <>
        <LoginForm />
        <button onClick={() => setShowRegister(true)}>Cadastrar Usuário</button>
      </>
    );
  }

  // Tela admin: lista de usuários (só admin)
  if (page === "/admin") {
    if (user.perfil !== "Administrador") {
      return (
        <>
          <p>⚠️ Acesso negado: Apenas administradores podem ver esta página.</p>
          <button onClick={() => goTo("/home")}>Voltar</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    }
    return (
      <>
        <UserList />
        <button onClick={() => goTo("/home")}>Voltar para Home</button>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  // Tela troca de senha
  if (page === "/alterar-senha") {
    return (
      <>
        <ChangePassword />
        <button onClick={() => goTo("/home")}>Voltar para Home</button>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  // Página home padrão
  return (
    <>
      <h1>Hola Mundo!</h1>
      <p>Bem-vindo, {user.nome} ({user.perfil})</p>
      <button onClick={() => goTo("/admin")}>Ir para Lista de Usuários</button>
      <button onClick={() => goTo("/alterar-senha")}>Alterar Senha</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
