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

function Citas({ onChangePage }) {
  const [mascota, setMascota] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  const refCitas = collection(db, "citas");

  const cargarCitas = async () => {
    const datos = await getDocs(refCitas);
    setLista(datos.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const cita = { mascota, fecha, hora, motivo };

    if (editId) {
      const ref = doc(db, "citas", editId);
      await updateDoc(ref, cita);
      setEditId(null);
    } else {
      await addDoc(refCitas, cita);
    }

    setMascota("");
    setFecha("");
    setHora("");
    setMotivo("");

    cargarCitas();
  };

  const eliminarCita = async (id) => {
    const ref = doc(db, "citas", id);
    await deleteDoc(ref);
    cargarCitas();
  };

  const editarCita = (c) => {
    setEditId(c.id);
    setMascota(c.mascota);
    setFecha(c.fecha);
    setHora(c.hora);
    setMotivo(c.motivo);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => onChangePage("home")} style={{ marginBottom: "20px" }}>
        ← Regresar
      </button>

      <h2>Gestión de Citas</h2>

      <form onSubmit={manejarSubmit}>
        <input value={mascota} onChange={(e) => setMascota(e.target.value)} placeholder="Mascota" />
        <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" />
        <input value={hora} onChange={(e) => setHora(e.target.value)} type="time" />
        <input value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Motivo" />

        <button type="submit">{editId ? "Guardar Cambios" : "Agregar Cita"}</button>
      </form>

      <hr />

      {lista.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Mascota:</strong> {c.mascota}</p>
          <p><strong>Fecha:</strong> {c.fecha}</p>
          <p><strong>Hora:</strong> {c.hora}</p>
          <p><strong>Motivo:</strong> {c.motivo}</p>

          <button onClick={() => editarCita(c)}>Editar</button>
          <button onClick={() => eliminarCita(c.id)} style={{ background: "red", color: "white" }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Citas;

