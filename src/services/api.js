// src/services/api.js
import axios from 'axios';

// Configuración de la API
// Cambia esta URL cuando despliegues en producción
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos timeout
});

// Variables de sesión
let currentSessionId = null;
let currentPhoneNumber = null;

/**
 * Inicia una nueva sesión con el bot
 * @param {string} phone - Número de teléfono opcional
 * @returns {Promise<Object>} - Datos de la sesión
 */
export const iniciarSesion = async (phone = null) => {
  try {
    // Si ya tenemos una sesión activa, la reutilizamos
    if (currentSessionId && !phone) {
      return { 
        session_id: currentSessionId, 
        estado: 'START',
        mensaje: 'Sesión existente' 
      };
    }
    
    const phoneOrigin = phone || `web_${Date.now()}`;
    const response = await api.post('/saludar', { 
      phone_origin: phoneOrigin 
    });
    
    currentSessionId = response.data.session_id;
    currentPhoneNumber = phoneOrigin;
    
    return response.data;
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    throw new Error('No se pudo conectar con el servidor');
  }
};

/**
 * Envía un mensaje al bot y obtiene respuesta
 * @param {string} mensaje - Mensaje del usuario
 * @returns {Promise<Object>} - Respuesta del bot
 */
export const enviarMensaje = async (mensaje) => {
  if (!currentSessionId) {
    await iniciarSesion();
  }
  
  if (!mensaje || mensaje.trim() === '') {
    throw new Error('El mensaje no puede estar vacío');
  }
  
  try {
    const response = await api.post('/analizar', {
      session_id: currentSessionId,
      mensaje: mensaje.trim(),
      phone_origin: currentPhoneNumber
    });
    
    // Actualizar session_id por si cambió (nueva conversación)
    if (response.data.session_id) {
      currentSessionId = response.data.session_id;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    
    if (error.response) {
      // El servidor respondió con un error
      throw new Error(error.response.data?.detail || 'Error del servidor');
    } else if (error.request) {
      // No hubo respuesta del servidor
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      throw new Error('Error al enviar el mensaje');
    }
  }
};

/**
 * Reinicia la conversación actual
 * @returns {Promise<Object>} - Nuevo saludo del bot
 */
export const resetConversacion = async () => {
  try {
    // Crear una nueva sesión
    const response = await iniciarSesion(currentPhoneNumber);
    return response;
  } catch (error) {
    console.error('Error reseteando conversación:', error);
    throw error;
  }
};

/**
 * Obtiene el ID de sesión actual
 * @returns {string|null} - Session ID o null si no hay sesión activa
 */
export const getSessionId = () => currentSessionId;

/**
 * Obtiene el número de teléfono actual
 * @returns {string|null} - Phone number o null
 */
export const getPhoneNumber = () => currentPhoneNumber;

/**
 * Establece manualmente la sesión (útil para restaurar sesiones)
 * @param {string} sessionId - ID de sesión
 * @param {string} phoneNumber - Número de teléfono
 */
export const setSession = (sessionId, phoneNumber) => {
  currentSessionId = sessionId;
  currentPhoneNumber = phoneNumber;
};

/**
 * Verifica el estado de salud del backend
 * @returns {Promise<boolean>} - True si el backend está activo
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/healthz');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

/**
 * Obtiene estadísticas de sesiones activas (solo debug)
 * @returns {Promise<Object>} - Estadísticas de sesiones
 */
export const getSessionsInfo = async () => {
  try {
    const response = await api.get('/sessions');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo sesiones:', error);
    return null;
  }
};

export default {
  iniciarSesion,
  enviarMensaje,
  resetConversacion,
  getSessionId,
  getPhoneNumber,
  setSession,
  healthCheck,
  getSessionsInfo
};