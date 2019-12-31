import fs from 'fs';
import process from 'process';

const variablesJson = JSON.parse(fs.readFileSync('./app/config/variablesMap.json'));

/**
 * 
 * @param {*} variable 
 */
export function get_var(variable) {

    let resultado = process.env[variable]
    if (!resultado) {
        return variablesJson[variable]
    }

    return resultado
}
