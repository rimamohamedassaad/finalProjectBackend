const User = require('../Models/userSchema')

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
  })}
}

const Usercontroller = new Controller();
module.exports = Usercontroller;