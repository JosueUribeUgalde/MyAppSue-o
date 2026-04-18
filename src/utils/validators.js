/**
 * UTILIDADES: Validadores
 * 
 * Funciones de validación para formularios y datos de entrada.
 * Valida emails, contraseñas, campos requeridos, etc.
 */

/**
 * Validar formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar fortaleza de contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Object} - { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es requerida' };
  }
  
  if (password.length < 6) {
    return { 
      isValid: false, 
      message: 'La contraseña debe tener al menos 6 caracteres' 
    };
  }
  
  if (password.length < 8) {
    return { 
      isValid: true, 
      message: 'Contraseña débil, considera usar 8+ caracteres' 
    };
  }
  
  return { isValid: true, message: 'Contraseña válida' };
};

/**
 * Validar que un campo no esté vacío
 * @param {string} value - Valor a validar
 * @param {string} fieldName - Nombre del campo
 * @returns {Object} - { isValid: boolean, message: string }
 */
export const validateRequired = (value, fieldName = 'Este campo') => {
  if (!value || value.trim() === '') {
    return { 
      isValid: false, 
      message: `${fieldName} es requerido` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validar formato de hora (HH:MM)
 * @param {string} time - Hora a validar
 * @returns {boolean} - True si es válida
 */
export const validateTime = (time) => {
  if (!time) return false;
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Validar rango numérico
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {Object} - { isValid: boolean, message: string }
 */
export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, message: 'Debe ser un número válido' };
  }
  
  if (num < min || num > max) {
    return { 
      isValid: false, 
      message: `El valor debe estar entre ${min} y ${max}` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validar que las contraseñas coincidan
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} - { isValid: boolean, message: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { 
      isValid: false, 
      message: 'Las contraseñas no coinciden' 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validar formulario completo de registro
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateSignupForm = (formData) => {
  const errors = {};
  let isValid = true;
  
  // Validar email
  if (!validateEmail(formData.email)) {
    errors.email = 'Email inválido';
    isValid = false;
  }
  
  // Validar contraseña
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
    isValid = false;
  }
  
  // Validar confirmación de contraseña
  const matchValidation = validatePasswordMatch(
    formData.password, 
    formData.confirmPassword
  );
  if (!matchValidation.isValid) {
    errors.confirmPassword = matchValidation.message;
    isValid = false;
  }
  
  // Validar nombre
  const nameValidation = validateRequired(formData.displayName, 'El nombre');
  if (!nameValidation.isValid) {
    errors.displayName = nameValidation.message;
    isValid = false;
  }
  
  return { isValid, errors };
};
