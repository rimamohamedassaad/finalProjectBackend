const Brand = require('../Models/brandSchema')

class Controller {
  //get All the Brands
  getAll(req, res, next) {
    Brand.find({},(err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      })
  }
//get Brand by ID
  get(req, res, next) {
      let { id } = req.params;
      Brand.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
  }
//Add an Brand
  post(req, res, next) {
    let body = req.body;
    let doc = new Brand(body);
    doc.save((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
//update an Brand
put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Brand.updateOne({ _id: id }, {
        $set: body
    }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
// Delete An Brand
delete(req, res, next) {
  let { id } = req.params;
  Brand.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })}
}

const Brandcontroller = new Controller();
module.exports = Brandcontroller;