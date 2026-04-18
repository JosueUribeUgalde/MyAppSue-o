/**
 * CONFIGURACIÓN DE FIREBASE
 * 
 * Inicializa y configura Firebase para la aplicación.
 * Exporta instancias de auth, firestore y storage.
 * 
 * IMPORTANTE: Reemplaza los valores de firebaseConfig con tus credenciales
 * de Firebase Console (https://console.firebase.google.com/)
 * 
 * Uso: import { auth, db, storage } from '@/config/firebase';
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase - REEMPLAZAR CON TUS CREDENCIALES
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  // measurementId: "TU_MEASUREMENT_ID" // Opcional para Analytics
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
