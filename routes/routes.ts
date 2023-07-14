import express from 'express'
import controllers from './controllers/controllers'

const { signUp, login, updateAccount, deleteAccount } = controllers

const router = express.Router()

router.post('/signUp', express.json(), signUp)
router.post('/login', express.json(), login)

router.put('/update', express.json(), updateAccount)

router.delete('/delete', express.json(), deleteAccount)

export default router