const express = require('express');
const { signUp, login, getUser, updateWeight } = require('./controllers/controllers');

const router = express.Router();

router.post('/signUp', express.json(), signUp);
router.post('/login', express.json(), login);

router.put('/updateWeight', express.json(), updateWeight);

router.get('/getUser/:id', getUser);

module.exports = router;