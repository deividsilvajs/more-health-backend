import express from 'express'
import controllers from './controllers/controllers'

const { signUp, login, update } = controllers

const router = express.Router()

router.post('/signUp', express.json(), signUp)
router.post('/login', express.json(), login)

router.put('/update', express.json(), update)

export default router