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
    const { username, email, password, phonenumber, address } = req.body;

    if (!username || !email || !password || !phonenumber || !address) {
      res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
      .then(user => {
        if (user) return res.status(400).json({ msg: 'user already exists' });
        const newuser = new User({ username, email, password, phonenumber, address });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            // if(err) throw err;
            newuser.password = hash;
            newuser.save()
              .then(user => {
                jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET_KEY,
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({
                      token,
                      user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        address: user.address
                      }
                    });
                  }
                )
              });
          })
        })
      })
  }
  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email }).select("+password")
      .then(user => {
        if (!user) return res.status(400).json({ msg: 'user does not exist' });

        // Validate password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            console.log(user.password)
            console.log("pass", password)
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            )
          })
      })
  }

}

const Usercontroller = new Controller();
module.exports = Usercontroller;