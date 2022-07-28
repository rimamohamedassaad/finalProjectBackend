var express = require('express');
var router = express.Router();
var admincontroller = require('../Controllers/adminController')
const {protect} = require('../middlewares/auth')
//get all the Admin
// router.get('/', admincontroller.getAll )
router.route('/').get(protect,admincontroller.getAll )


//get an Admin by id
router.get('/:id', admincontroller.get)

 // Add new Admin
 router.post('/', admincontroller.post)

//update an Admin by _id
router.put('/:id', admincontroller.put)

//delete an Admin by id
 router.delete('/:id', admincontroller.delete)


module.exports = router;