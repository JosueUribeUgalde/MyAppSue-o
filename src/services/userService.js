/**
 * SERVICIO: GESTIÓN DE USUARIOS
 * 
 * Maneja la información de perfil del usuario en Firestore.
 * Complementa Firebase Auth con datos adicionales.
 * 
 * Funciones disponibles:
 * - createUserProfile: Crear perfil de usuario
 * - getUserProfile: Obtener perfil de usuario
 * - updateUserProfile: Actualizar perfil
 * - deleteUserProfile: Eliminar perfil
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';

/**
 * Crear un perfil de usuario en Firestore
 * @param {string} userId - ID del usuario (de Auth)
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userProfile = {
      email: userData.email,
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      sleepGoal: userData.sleepGoal || 8, // horas deseadas de sueño
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(doc(db, USERS_COLLECTION, userId), userProfile);
    return { success: true, data: userProfile };
  } catch (error) {
    console.error('Error al crear perfil de usuario:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verificar si existe un perfil de usuario, si no existe lo crea
 * @param {string} userId - ID del usuario
 * @param {Object} userData - Datos del usuario de Auth
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const ensureUserProfile = async (userId, userData) => {
  try {
    // Primero intentamos obtener el perfil
    const profileResult = await getUserProfile(userId);
    
    // Si existe, retornamos éxito sin log
    if (profileResult.success) {
      return { success: true, data: profileResult.data, created: false };
    }
    
    // Si no existe, lo creamos
    const createResult = await createUserProfile(userId, userData);
    
    if (createResult.success) {
      return { success: true, data: createResult.data, created: true };
    }
    
    return createResult;
  } catch (error) {
    console.error('Error en ensureUserProfile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener el perfil de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Datos del perfil
 */
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Actualizar el perfil de un usuario
 * @param {string} userId - ID del usuario
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Eliminar el perfil de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const deleteUserProfile = async (userId) => {
  try {
    await deleteDoc(doc(db, USERS_COLLECTION, userId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
