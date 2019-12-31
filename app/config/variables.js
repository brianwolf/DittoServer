import process from 'process';
import { mapa } from './MapaVariables.js';

/**
 * Devuelve el valor de su correspondiente variable de ambiente,
 * en caso de no encontrarlo devuelve el del **mapaVariabls.js**
 * 
 * @param {*} variable 
 */
export function get(variable) {
    return process.env[variable] || mapa[variable]
}
