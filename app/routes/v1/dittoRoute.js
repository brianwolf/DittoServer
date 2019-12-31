import express from 'express';

export const rutaBase = ''
export const router = express.Router();


router.get('/prueba', (req, res) => {
    
    res.status(200).send({ funciona: 'como los mejores' })
}
)
