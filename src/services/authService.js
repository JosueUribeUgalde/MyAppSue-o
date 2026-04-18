/**
 * SERVICIO: AUTENTICACIÓN
 * 
 * Maneja toda la lógica de autenticación con Firebase Auth.
 * Separa la lógica de negocio de los componentes UI.
 * 
 * Funciones disponibles:
 * - signUpWithEmail: Registro de usuarios
 * - signInWithEmail: Inicio de sesión
 * - signOutUser: Cerrar sesión
 * - resetPassword: Restablecer contraseña
 * - getCurrentUser: Obtener usuario actual
 */

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Registrar un nuevo usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @param {string} displayName - Nombre para mostrar
 * @returns {Promise<Object>} - Usuario creado
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar el perfil con el nombre
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Iniciar sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - Usuario autenticado
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Cerrar sesión del usuario actual
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Enviar email para restablecer contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Obtener el usuario actualmente autenticado
 * @returns {Object|null} - Usuario actual o null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
