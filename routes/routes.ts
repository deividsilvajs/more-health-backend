import express from 'express';
import controllers from './controllers/controllers';

const { signUp, login, getUser, updateWeight } = controllers;

const router = express.Router();

router.post('/signUp', express.json(), signUp);
router.post('/login', express.json(), login);

router.put('/updateWeight', express.json(), updateWeight);

router.get('/getUser/:id', getUser);

export default router;