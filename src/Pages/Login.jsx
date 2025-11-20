import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Esto te lleva a Home
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{ width: "300px", margin: "80px auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;

