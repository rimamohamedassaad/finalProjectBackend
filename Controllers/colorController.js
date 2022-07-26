const Color = require('../Models/colorSchema')

class Controller {
  //get All the Colors
  getAll(req, res, next) {
    Color.find((err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      })
  }
//get Color by ID
  get(req, res, next) {
      let { id } = req.params;
      Color.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
  }
//Add an Color
  post(req, res, next) {
    let body = req.body;
    let doc = new Color(body);
    doc.save((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
//update an Color
put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Color.updateOne({ _id: id }, {
        $set: body
    }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
}
// Delete An Color
delete(req, res, next) {
  let { id } = req.params;
  Color.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })}
}

const Colorcontroller = new Controller();
module.exports = Colorcontroller;