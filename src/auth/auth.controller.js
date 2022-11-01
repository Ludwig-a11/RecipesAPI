//? aqui crearemos un controlador apar avalidar una cuenta
//? login = email y contraseña
//? el email es unico en base de datos

const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require('../utils/crypto');

//?aqui comparamos si los datos son validos y mostramos la info
//? Este controller tiene 2 posibles respuestas 
//? 1. las credenciales son validas y retorna el usuario
//? 2. las credenciales son invalidas y retornamos false 
const loginUser = async(email, password) => {
    try {
      const user = await getUserByEmail(email)
        //? user.password contiene contraseña encruptada en DB
      const verifyPassword = comparePassword(password, user.password)
      if(verifyPassword){
        return user
      }
      return false

    } catch {
        return false
    }
};

//console.log(loginUser('ludwig@academlo.com', 'fullstack'));

module.exports = {
  loginUser
}
