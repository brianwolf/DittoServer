import express from 'express'
const router = express.Router();

router.get('/api', (req, res) => {
    res.status(200).send('Esta vivo, VIVO...!!!')
})

export default async () => router