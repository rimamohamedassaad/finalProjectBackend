const Admin = require('../Models/adminSchema')

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
  })}
}

const admincontroller = new Controller();
module.exports = admincontroller;