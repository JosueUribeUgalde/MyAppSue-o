/**
 * HOOK: useAuth
 * 
 * Hook personalizado para gestionar el estado de autenticación.
 * Facilita el acceso al usuario actual y funciones de autenticación.
 * 
 * Retorna:
 * - user: Usuario actual
 * - loading: Estado de carga
 * - signUp: Función de registro
 * - signIn: Función de inicio de sesión
 * - logout: Función de cerrar sesión
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signOutUser 
} from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener para cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, displayName) => {
    setLoading(true);
    const result = await signUpWithEmail(email, password, displayName);
    setLoading(false);
    return result;
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await signOutUser();
    setLoading(false);
    return result;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    logout,
  };
};
