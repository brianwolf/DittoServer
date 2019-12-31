import mongoose from 'mongoose';
import * as vars from './variables.js'

const option = { useUnifiedTopology: true, useNewUrlParser: true }

const MONGO_USER = vars.get('MONGO_USER')
const MONGO_PASS = vars.get('MONGO_PASS')
const MONGO_HOST = vars.get('MONGO_HOST')
const MONGO_PORT = vars.get('MONGO_PORT')
const MONGO_DB = vars.get('MONGO_DB')

const coneccion_str = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

export const coneccion = mongoose.connect(coneccion_str, option, err => {
    if (err) throw err
    console.log(`Coneccion establecida con ${MONGO_DB}`)
})