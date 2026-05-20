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
import { validatePassword } from '../utils/validators';

/**
 * Registrar un nuevo usuario con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @param {string} displayName - Nombre para mostrar
 * @returns {Promise<Object>} - Usuario creado
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: passwordValidation.message,
      };
    }

    // 1. Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Actualizar el perfil con el nombre
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // 3. Retornar el usuario para que se pueda crear el perfil en Firestore
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Retornar el código de error de Firebase
    return { 
      success: false, 
      error: error.code || error.message || 'Error desconocido'
    };
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
    // Retornar el código de error de Firebase
    return { 
      success: false, 
      error: error.code || error.message || 'Error desconocido'
    };
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
