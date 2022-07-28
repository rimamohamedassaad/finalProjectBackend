var express = require('express');
var router = express.Router();
var usercontroller = require('../Controllers/userController')

//get all the user
router.get('/', usercontroller.getAll )

//get an user by id
router.get('/:id', usercontroller.get)

 // Add new user
 router.post('/', usercontroller.post)

//update an user by _id
router.put('/:id', usercontroller.put)

//delete an user by id
 router.delete('/:id', usercontroller.delete)

//add new user
router.post("/register", usercontroller.register);
//login user 
router.post("/login", usercontroller.login);



module.exports = router;