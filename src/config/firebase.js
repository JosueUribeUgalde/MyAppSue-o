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
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Web usa la persistencia nativa del navegador; Android/iOS usan AsyncStorage.
const createAuth = () => {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    const { getReactNativePersistence } = require('firebase/auth');
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    return getAuth(app);
  }
};

export const auth = createAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
