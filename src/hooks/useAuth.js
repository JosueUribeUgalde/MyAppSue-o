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

import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signOutUser 
} from '../services/authService';
import { createUserProfile, ensureUserProfile } from '../services/userService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const profileChecked = useRef(new Set()); // Trackear usuarios ya verificados

  useEffect(() => {
    // Listener para cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Solo verificar perfil si no lo hemos hecho antes para este usuario
        if (!profileChecked.current.has(currentUser.uid)) {
          await ensureUserProfile(currentUser.uid, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          });
          profileChecked.current.add(currentUser.uid);
        }
      } else {
        // Limpiar el set cuando no hay usuario (logout)
        profileChecked.current.clear();
      }
      
      setUser(currentUser);
      setLoading(false);
      setInitializing(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, displayName) => {
    try {
      setLoading(true);
      
      // 1. Crear usuario en Firebase Auth
      const authResult = await signUpWithEmail(email, password, displayName);
      
      if (!authResult.success) {
        setLoading(false);
        return authResult;
      }
      
      // 2. Crear perfil en Firestore
      const profileResult = await createUserProfile(authResult.user.uid, {
        email: authResult.user.email,
        displayName: displayName,
        photoURL: authResult.user.photoURL || '',
        sleepGoal: 8,
      });
      
      if (!profileResult.success) {
        console.error('Error al crear perfil, pero usuario Auth creado');
        // Nota: El usuario ya está creado en Auth, el perfil se intentará crear
        // automáticamente en el listener de onAuthStateChanged
      }
      
      setLoading(false);
      return { success: true, user: authResult.user };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      // Iniciar sesión (el perfil se verificará automáticamente en onAuthStateChanged)
      const result = await signInWithEmail(email, password);
      
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
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
    initializing,
    signUp,
    signIn,
    logout,
  };
};
