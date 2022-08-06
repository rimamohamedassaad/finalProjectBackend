require('dotenv').config();
const Admin = require('../Models/adminSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class Controller {

  //get All the Admins
  getAll(req, res, next) {
    Admin.find((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
  }
  //get Admin by ID
  get(req, res, next) {
    let { id } = req.params;
    Admin.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //Add an Admin
  post(req, res, next) {
    let body = req.body;
    let doc = new Admin(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //update an Admin
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Admin.updateOne({ _id: id }, {
      $set: body
    }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  // Delete An Admin
  delete(req, res, next) {
    let { id } = req.params;
    Admin.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
  }
  // Adding New Admin / Register
  signup = (req, res) => {
    const { name, email, password } = req.body;
    const { image } = req.files
   
    try {
      if (!name || !email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
      }
      Admin.findOne({ email })
        .then(admin => {
          if (admin) return res.status(400).json({ msg: 'Admin already exists' });
          const otp = Math.floor(Math.random() * 1000000)
  
          const newadmin = Admin.create({ name, email, password, image, otp, otp_expiry: new Date.now() + process.env.otp_expiry * 60 * 1000 })
  
  
          // const newAdmin = new Admin({ name, email, password });
  
          // // Create salt and hash
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(password, salt, (err, hash) => {
          //     if (err) throw err;
          //     newAdmin.password = hash;
          //     newAdmin.save()
          //       .then(admin => {
          //         jwt.sign(
          //           { id: admin._id },
          //           process.env.JWT_SECRET_KEY,
          //           { expiresIn: 3600 },
          //           (err, token) => {
          //             if (err) throw err;
          //             res.json({
          //               token,
          //               admin: {
          //                 id: admin._id,
          //                 name: admin.name,
          //                 email: admin.email
          //               }
          //             });
          //           }
          //         )
          //       });
          //   })
          // })
        })
    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })
    }
    
  }

}

const admincontroller = new Controller();
module.exports = admincontroller;