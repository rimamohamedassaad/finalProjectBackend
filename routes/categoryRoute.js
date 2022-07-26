var express = require('express');
var router = express.Router();
var categorycontroller = require('../Controllers/categoryController')

//get all the category
router.get('/', categorycontroller.getAll )

//get an category by id
router.get('/:id', categorycontroller.get)

 // Add new category
 router.post('/', categorycontroller.post)

//update an category by _id
router.put('/:id', categorycontroller.put)

//delete an category by id
 router.delete('/:id', categorycontroller.delete)


module.exports = router;