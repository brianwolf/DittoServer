import fs from 'fs';
import process from 'process';
import { mapa } from './variablesMap.js';

// const variablesJson = JSON.parse(fs.readFileSync('./app/config/variablesMap.json'));

/**
 * 
 * @param {*} variable 
 */
export function get(variable) {
    return process.env[variable] || mapa[variable]
}
