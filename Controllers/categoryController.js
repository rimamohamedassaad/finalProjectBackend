const Category = require('../Models/categorySchema')

class Controller {
  //get All the Categorys
  getAll(req, res, next) {
    Category.find((err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      })
  }
//get Category by ID
  get(req, res, next) {
      let { id } = req.params;
      Category.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
  }
//Add an Category
  post(req, res, next) {
    let body = req.body;
    let doc = new Category(body);
    doc.save((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
//update an Category
put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Category.updateOne({ _id: id }, {
        $set: body
    }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
// Delete An Category
delete(req, res, next) {
  let { id } = req.params;
  Category.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })}
}

const Categorycontroller = new Controller();
module.exports = Categorycontroller;