import { httpClient } from '@/services/http-client';

/**
 * Obtiene registros paginados de viajes que ya hayan sido creados.
 * @param {number} documentsPerPage Cantidad de registros que se desea obtener por cada página.
 * @param {number} pageNumber       Número de la página que se está consultando.
 * @returns {
 *  paginations: {
 *    documentsPerPage: number,
 *    pageNumber: number,
 *    numberOfDocument: number
 *  },
 *  rides: Array<{
 *    _id: string,
 *    fare: number,
 *    distance:number,
 *    startTine: string,
 *    duration: number
 *  }>
 * }
 */
export const getRides = async (documentsPerPage, pageNumber) => {
  return (await httpClient.get('rides', { params: { documentsPerPage, pageNumber } })).data;
};

/**
 * Realiza llamada contra API para crear registro del viaje.
 * @param {number} distance   Distancia recorrida en el viaje en millas.
 * @param {string} startTime  Fecha en formato ISO8601 indicando el momento enque comenzó el viaje.
 * @param {number} duration   Tiempo de duración del viaje en segundos.
 * @returns {
 *  _id: string,
 *  fare: number,
 *  distance:number,
 *  startTine: string,
 *  duration: number
 * }                          Respuesta del backend. Corresponde a un objeto con las tres ll
 */
export const createRide = async (distance, startTime, duration) => {
  return (
    await httpClient.post('rides', {
      distance,
      startTime,
      duration
    })
  ).data;
};
