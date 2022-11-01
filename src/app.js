//? Dependencies
const express = require('express');
const db = require('./utils/database');


//? files
const {port} = require('./config')


//?Routes
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
const initModels = require('./models/initModels');

//?Initial configs
const app = express()

app.use(express.json())

db.authenticate()
    .then(() => {
        console.log('DB Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('DB Synced')
    })
    .catch(err => {
        console.log(err)
    })
initModels()


app.get('/', (req,res) => {
  res.status(200).json({
    message: 'OK!', 
    users: `localhost: ${port}/api/v1/users`
  })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)




app.listen(9000,() => {
  console.log(`Server started at port ${port}`);
})