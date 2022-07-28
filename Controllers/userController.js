const User = require('../Models/userSchema')
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

class Controller {
  //get All the Users
  getAll(req, res, next) {
    User.find((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
  }
  //get User by ID
  get(req, res, next) {
    let { id } = req.params;
    User.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //Add an User
  post(req, res, next) {
    let body = req.body;
    let doc = new User(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //update an User
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    User.updateOne({ _id: id }, {
      $set: body
    }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  // Delete An User
  delete(req, res, next) {
    let { id } = req.params;
    User.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
  }

  //add new user 
  register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username, email, password
      })
      jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token,
          });
        }
      )
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }
  login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new ErrorResponse("please provide email and password"))
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("invalide cridentials"))
      }
      const isMatch = await user.matchPassword(password)
      if (!isMatch) {
        return next(new ErrorResponse("incorrect password"))
      }
      jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token,
          });
        }
      )
    } catch (error) {

      next(error)
    }

  }
  forgotPassword = async (req, res, next) => {
    const { email } = request.body;
    try {
      const user = User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse("email could not be found", 404))
      }
      const resetToken = user.getResetPassword();

      await user.save();
      const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`;
      
    } catch (error) {

    }
  }


}

const Usercontroller = new Controller();
module.exports = Usercontroller;