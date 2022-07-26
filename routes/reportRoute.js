var express = require('express');
var router = express.Router();
var reportscontroller = require('../Controllers/reportController')

//get all the reports
router.get('/', reportscontroller.getAllReports)

//get an reports by id
router.get('/:id', reportscontroller.get)

 // Add new reports
 router.post('/', reportscontroller.post)

//update an reports by _id
router.put('/:id', reportscontroller.put)

//delete an reports by id
 router.delete('/:id', reportscontroller.delete)


module.exports = router;