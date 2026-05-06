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

// Configuración de Firebase - Credenciales del proyecto SleepTrack
const firebaseConfig = {
  apiKey: "AIzaSyAnUyGdkM_GCCS07AEUlXeGN8xSR_Ug-dI",
  authDomain: "sleeptrack-4d3b6.firebaseapp.com",
  projectId: "sleeptrack-4d3b6",
  storageBucket: "sleeptrack-4d3b6.firebasestorage.app",
  messagingSenderId: "753326145118",
  appId: "1:753326145118:web:bbeb40959377bb1402becf",
  measurementId: "G-KMQKVJW43B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
