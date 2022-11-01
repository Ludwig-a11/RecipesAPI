//? va a conterner las rutas de autorizacion y autenticacion 
//* login 
//* register
//* recobery password
//* verify user

const router = require('express').Router();
const authServices = require('./auth.services');
const {registerUser} =require('../users/users.services');

//? prefix /api/v1/auth
router.post('/register', registerUser)
router.post('/login', authServices.login)

module.exports = router