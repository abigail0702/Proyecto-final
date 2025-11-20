import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Home({ onLogout, onChangePage }) {
  const handleLogout = () => {
    signOut(auth);
    onLogout();
  };

  return (
    <div className="home-container">
      <h1>🐾 Veterinaria</h1>
      <h3>Sistema Administrativo</h3>

      <div className="menu-buttons">
        <button className="menu-btn" onClick={() => onChangePage("mascotas")}>
         Mascotas
        </button>

        <button className="menu-btn" onClick={() => onChangePage("citas")}>
          Citas
        </button>

        <button className="menu-btn" onClick={() => onChangePage("servicios")}>
          Servicios
        </button>

        <button
          className="menu-btn"
          style={{ background: "#ff6b6b" }}
          onClick={handleLogout}
        >
         Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Home;
