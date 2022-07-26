var express = require('express');
var router = express.Router();
var colorcontroller = require('../Controllers/colorController')

//get all the color
router.get('/', colorcontroller.getAll )

//get an color by id
router.get('/:id', colorcontroller.get)

 // Add new color
 router.post('/', colorcontroller.post)

//update an color by _id
router.put('/:id', colorcontroller.put)

//delete an color by id
 router.delete('/:id', colorcontroller.delete)


module.exports = router;