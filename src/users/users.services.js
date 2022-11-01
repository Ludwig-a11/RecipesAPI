const usersControllers = require('./users.controllers');


const getAllUsers = (req, res) => {
  usersControllers.getAllUsers()
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) =>{
    res.status(400).json({message: err.message})
  })
};

const getUserById = (req, res) => {
  const id = req.params.id 
  usersControllers.getUserById(id)
      .then(data => {
          res.status(200).json(data)
      })
      .catch((err) => {
          res.status(404).json({message: err.message})
      })
};

const registerUser = (req, res) => {
  const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body
  if ( firstName && lastName && email && password && phone && birthday ){
    //ya que existen todos los datos para ejecutar el controller
    usersControllers.createUser({
      firstName, lastName, email, password, phone, birthday, gender, country  
    })
    .then( data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  }else{
    //error cuando no mandan los datos necesarios
    res.status(400).json({message: 'All fields must be complete', fields:{
      firstName: 'string',
      lastName: 'string',
      email: 'example@example.com',
      password: 'string',
      phone: '+12345678910',
      birthday: 'YYYY/MM/DD'
    }})
  }
};


const patchUser = (req, res) => {
  const id = req.params.id 
  const { firstName, lastName, phone, gender, country  } = req.body

  usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
  .then( data => {
    if(data[0]){
      res.status(200).json({message: `User with ID: ${id}, edited successfully! `})
    } else {
      res.status(404).json({message: 'Invalid ID!'})
    }
  })
  .catch( err => {
    res.status(400).json({message: err.message})
  })
};

const deleteUser = (req, res) =>{
  const id = req.params.id 

  usersControllers.deleteUser(id)
  .then((data) => {
    if(data){
      res.status(204).json()
    }else {
      res.status(404).json({message: 'Invalid ID!'})
    }
  })
  .catch((err) => {
    res.status(400).json({message: err.message})
  })
};


//? My user services 
const getMyUser = (req, res) => {
  const id = req.user.id //?req.user contiene la informacion del Token desencriptado
  
  usersControllers.getUsersById(id)
  .then(data => {
    res.status(200).json(data)
  }) 
  .catch(err => {
    res.status(400).json({message: err.message})
  })

};


const patchMyUser = (req, res) => {
  const id = req.user.id 
  const { firstName, lastName, phone, birthday, gender, country } = req.body

  usersControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
  .then(() => {
    res.status(200).json({message: `Your user was edited succesfully!`})
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })

};

//? 2 tipos de delete: 1. por administrador y 2. por mi mismo
const deleteMyUser =(req, res) => {
  const id = req.user.id

  usersControllers.updateUser(id, { status:'inactive!' })
  .then(() => {
    res.status(200).json({message: 'Your user was deleted successfully!'})
  })
  .catch((err) => {
    res.status(400).json({message: err.message})
  })
};



module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  registerUser,
  deleteUser,
  getMyUser,
  patchMyUser,
  deleteMyUser
}