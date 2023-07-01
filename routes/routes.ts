import express from 'express'
import controllers from './controllers/controllers'

const { signUp, login } = controllers

const router = express.Router()

router.post('/signUp', express.json(), signUp)
router.post('/login', express.json(), login)

export default router