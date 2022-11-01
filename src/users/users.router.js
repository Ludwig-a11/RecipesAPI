const router = require('express').Router();
const userServices = require('./users.services');
const adminValidate = require('../middlewares/role.middleware');
//? esta combinacion espara manejar rutas protegidas
const passport = require('passport');
require('../middlewares/auth.middleware')(passport);



//? Root routes
//? añadiendo passport... generamos una ruta protegida
router.get('/', userServices.getAllUsers)

//? /api/v1/users/me
//? Esta ruta de informacion propia del usuario loggeado
router.route('/me')
  .get(
    passport.authenticate('jwt', {session: false}),
    userServices.getMyUser)
  .patch(
    passport.authenticate('jwt',{session: false}),
    userServices.patchMyUser)
  .delete(
    passport.authenticate('jwt', {session: false}),
    userServices.deleteMyUser) 



//? /api/v1/users/:id
//? dynamics router by ID when one route has differents requests /verbs
router.route('/:id')
  .get(userServices.getUserById)
  .patch(
    passport.authenticate('jwt', {session: false}),
    adminValidate,
    userServices.patchUser)
  .delete(
    passport.authenticate('jwt', {session: false}),
    adminValidate,
    userServices.deleteUser)



  module.exports = router