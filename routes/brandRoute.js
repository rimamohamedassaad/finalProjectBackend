var express = require('express');
var router = express.Router();
var brandcontroller = require('../Controllers/brandController')

//get all the brand
router.get('/', brandcontroller.getAll)

//get an brand by id
router.get('/:id', brandcontroller.get)

 // Add new brand
 router.post('/', brandcontroller.post)

//update an brand by _id
router.put('/:id', brandcontroller.put)

//delete an brand by id
 router.delete('/:id', brandcontroller.delete)


module.exports = router;