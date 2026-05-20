import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 SE JÁ ESTIVER LOGADO → SAI DO LOGIN
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    const token = localStorage.getItem("access");

    if (token) {
      navigate("/");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Login inválido");
    }
  }

  return (
    <div className="container_login">
      <form onSubmit={handleLogin} className="login-box">
        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
