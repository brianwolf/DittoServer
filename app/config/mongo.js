import mongoose from 'mongoose';
import * as vars from './variables.js';

const option = { useUnifiedTopology: true, useNewUrlParser: true }

const MONGO_USER = vars.get('MONGO_USER')
const MONGO_PASS = vars.get('MONGO_PASS')
const MONGO_HOST = vars.get('MONGO_HOST')
const MONGO_PORT = vars.get('MONGO_PORT')
const MONGO_DB = vars.get('MONGO_DB')

const coneccion_str = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

export const mongo = mongoose.connect(coneccion_str, option, err => {
    if (err) {
        console.error(`Error coneccion con mongoDB, coneccion: ${coneccion_str}`)
        throw err
    }
    console.log(`Conectado a la base ${MONGO_DB} de MongoDB`)
})