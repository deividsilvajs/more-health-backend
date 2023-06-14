import express from 'express';
const { signUp, login, getUser, updateWeight } = 
require('./controllers/controllers'); // Preciso atualizar o arquivo para ts

const router = express.Router();

router.post('/signUp', express.json(), signUp);
router.post('/login', express.json(), login);

router.put('/updateWeight', express.json(), updateWeight);

router.get('/getUser/:id', getUser);

export default router;