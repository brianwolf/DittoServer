import process from 'process'

export const mapa = {
    HOST: 'localhost',
    PORT: 7000,
    MONGO_HOST: 'localhost',
    MONGO_PORT: 27017,
    MONGO_DB: 'dittoServer',
    MONGO_USER: 'leafnoise',
    MONGO_PASS: 'leafnoise',

    LOGS_RUTA: process.cwd() + '/logs/',
    LOGS_NIVEL: 'debug',
    LOG_PREDEFINIDO: 'app'
}