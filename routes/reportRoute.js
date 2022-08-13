var express = require('express');
var router = express.Router();
var reportscontroller = require('../Controllers/reportController')

var multer = require("multer");
 const { v4: uuidv4 } = require("uuid");
 const DIR = "./public/images";
 
 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, DIR);
   },
   filename: (req, file, cb) => {
     const fileName = file.originalname.toLowerCase().split(" ").join("-");
     cb(null, uuidv4() + "-" + fileName);
   },
 });
 
 var upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
     if (
       file.mimetype == "image/png" ||
       file.mimetype == "image/jpg" ||
       file.mimetype == "image/jpeg" 
     ) {
       cb(null, true);
     } else {
       cb(null, false);
       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
     }
   },
 });


//get all the reports
router.get('/', reportscontroller.getAllReports)
router.get("/color/:id", reportscontroller.getByColor);
router.get("/category/:id", reportscontroller.getByCategory);
router.get("/brand/:id", reportscontroller.getByBrand);


//get an reports by id
router.get('/:id', reportscontroller.get)

 // Add new reports
 router.post("/", upload.array("reportimage", 6),reportscontroller.addNewPhone);
//update an reports by _id
router.put('/:id', reportscontroller.put)

//delete an reports by id
 router.delete('/:id', reportscontroller.delete)
 
 

module.exports = router;