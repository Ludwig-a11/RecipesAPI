//? Middleware para protejer rutas 
//* 1. Revisar si existe un Token 
//* 2. Verificar si el Token pertenece a un usuario valido 
//* 3. Modificar el request y greagar req.user con la info desencriptado del Token 

const { jwtSecret } = require('../config');
const { getUsersById } = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy; //? Passport maneja estrategias para las diferentes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt; //? Extrae desde los headers de la peticion

//? Exportando funcion anonima 
module.exports = (passport) => {
  const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey : jwtSecret // palabra clave 
  }
//? decoded es el id codificado 
//? new genera una nueva instancia para generar la estrategia 
  passport.use(
    new JwtStrategy(options, async (decoded, done) => {
      //? done(error, decoded)
      try {
        const response = await getUsersById(decoded.id)
        if(!response){
          return done(null, false) //? false es porque no existe el usuario
        }
          console.log('decoded JWT', decoded);
          return done(null, decoded)
      } catch (error) {
        return done(error, false)
      }
    })
  )
};