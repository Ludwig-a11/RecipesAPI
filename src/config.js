const { ParameterDescriptionMessage } = require('pg-protocol/dist/messages')

//?Dependencies
require('dotenv').config()

const config ={
  port: process.env.PORT || 9000,
  nodeEnv: process.env.NODE_ENV || 'development', //? desarrollo, testing, produccion
  jwtSecret: process.env.JWT_SECRET, //? NO pasar sugerencia - por seguirdad -
  db:{
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'b0u3',
    dbName: process.env.DB_NAME
  }
}

module.exports = config 