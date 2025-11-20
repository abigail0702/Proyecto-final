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

function Mascotas({ onChangePage }) {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [tamano, setTamano] = useState("");
  const [edad, setEdad] = useState("");
  const [dueno, setDueno] = useState("");
  const [telefono, setTelefono] = useState("");

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  const refMascotas = collection(db, "mascotas");

  const cargarMascotas = async () => {
    const datos = await getDocs(refMascotas);
    setLista(datos.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const mascota = { nombre, raza, tamano, edad, dueno, telefono };

    if (editId) {
      const ref = doc(db, "mascotas", editId);
      await updateDoc(ref, mascota);
      setEditId(null);
    } else {
      await addDoc(refMascotas, mascota);
    }

    setNombre("");
    setRaza("");
    setTamano("");
    setEdad("");
    setDueno("");
    setTelefono("");

    cargarMascotas();
  };

  const eliminarMascota = async (id) => {
    const ref = doc(db, "mascotas", id);
    await deleteDoc(ref);
    cargarMascotas();
  };

  const editarMascota = (m) => {
    setEditId(m.id);
    setNombre(m.nombre);
    setRaza(m.raza);
    setTamano(m.tamano);
    setEdad(m.edad);
    setDueno(m.dueno);
    setTelefono(m.telefono);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => onChangePage("home")} style={{ marginBottom: "20px" }}>
        ← Regresar
      </button>

      <h2>Gestión de Mascotas</h2>

      <form onSubmit={manejarSubmit}>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <input value={raza} onChange={(e) => setRaza(e.target.value)} placeholder="Raza" />
        <input value={tamano} onChange={(e) => setTamano(e.target.value)} placeholder="Tamaño" />
        <input value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" />
        <input value={dueno} onChange={(e) => setDueno(e.target.value)} placeholder="Dueño" />
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />

        <button type="submit">{editId ? "Guardar Cambios" : "Agregar Mascota"}</button>
      </form>

      <hr />

      {lista.map((m) => (
        <div key={m.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Nombre:</strong> {m.nombre}</p>
          <p><strong>Raza:</strong> {m.raza}</p>
          <p><strong>Tamaño:</strong> {m.tamano}</p>
          <p><strong>Edad:</strong> {m.edad}</p>
          <p><strong>Dueño:</strong> {m.dueno}</p>
          <p><strong>Teléfono:</strong> {m.telefono}</p>

          <button onClick={() => editarMascota(m)}>Editar</button>
          <button onClick={() => eliminarMascota(m.id)} style={{ background: "red", color: "white" }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Mascotas;


