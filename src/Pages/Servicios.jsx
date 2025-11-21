import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function Servicios({ onChangePage }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  const refServicios = collection(db, "servicios");

  const cargarServicios = async () => {
    const datos = await getDocs(refServicios);
    setLista(datos.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const servicio = { nombre, precio, descripcion };

    if (editId) {
      const ref = doc(db, "servicios", editId);
      await updateDoc(ref, servicio);
      setEditId(null);
    } else {
      await addDoc(refServicios, servicio);
    }

    setNombre("");
    setPrecio("");
    setDescripcion("");

    cargarServicios();
  };

  const eliminarServicio = async (id) => {
    const ref = doc(db, "servicios", id);
    await deleteDoc(ref);
    cargarServicios();
  };

  const editarServicio = (s) => {
    setEditId(s.id);
    setNombre(s.nombre);
    setPrecio(s.precio);
    setDescripcion(s.descripcion);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => onChangePage("home")} style={{ marginBottom: "20px" }}>
        ← Regresar
      </button>

      <h2>Gestión de Servicios</h2>

      <form onSubmit={manejarSubmit}>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <input value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />

        <button type="submit">{editId ? "Guardar Cambios" : "Agregar Servicio"}</button>
      </form>

      <hr />

      {lista.map((s) => (
        <div key={s.id} className="card">
          <p><strong>Servicio:</strong> {s.nombre}</p>
          <p><strong>Precio:</strong> Q{s.precio}</p>
          <p><strong>Descripción:</strong> {s.descripcion}</p>

          <button onClick={() => editarServicio(s)}>Editar</button>
          <button onClick={() => eliminarServicio(s.id)} style={{ background: "red", color: "white" }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Servicios;


