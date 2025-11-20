// Importa Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDughUD12zIEIpA1FUYUc5Mpa-1PSHlh8I",
  authDomain: "veterinaria-898c9.firebaseapp.com",
  projectId: "veterinaria-898c9",
  storageBucket: "veterinaria-898c9.firebasestorage.app",
  messagingSenderId: "156812423844",
  appId: "1:156812423844:web:f793119fe0482cadd42c31"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos Autenticación y Base de Datos
export const auth = getAuth(app);

export const db = getFirestore(app);
