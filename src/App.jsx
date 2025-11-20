import { useState } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Mascotas from "./Pages/Mascotas";
import Citas from "./Pages/Citas";
import Servicios from "./Pages/Servicios";
import "./App.css";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("home");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  if (loggedIn && page === "home") {
    return <Home onLogout={() => setLoggedIn(false)} onChangePage={setPage} />;
  }

  if (loggedIn && page === "mascotas") {
    return <Mascotas onChangePage={setPage} />;
  }

  if (loggedIn && page === "citas") {
    return <Citas onChangePage={setPage} />;
  }

  if (loggedIn && page === "servicios") {
    return <Servicios onChangePage={setPage} />;
  }

  return null;
}

export default App;

