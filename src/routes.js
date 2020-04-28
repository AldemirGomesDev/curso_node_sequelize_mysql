const express = require('express');

const UserController = require('./controllers/UserController');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();


router.get('/users', authMiddleware, UserController.index);

router.post('/users', UserController.store);

router.put('/users/:user_id', UserController.update);

router.delete('/users/:user_id', UserController.delete);

router.post('/users/login', UserController.login);

module.exports = router;