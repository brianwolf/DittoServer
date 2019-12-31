import process from 'process';
import { mapa } from './MapaVariables.js';

/**
 * 
 * @param {*} variable 
 */
export function get(variable) {
    return process.env[variable] || mapa[variable]
}
