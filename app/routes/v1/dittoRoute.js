import express from 'express';

export const rutaBase = '/dittos'

const router = express.Router();

router.get('', (req, res) => {
    res.status(200).send('Esta vivo, VIVO...!!!')
})

export default async () => router
