const Report = require('../Models/reportsSchema')

class Controller {
  //get All the Reports

  getAllReports(req, res, next) {
    Report.find().populate("color").populate("brand").populate("category").populate("user").exec(function (err, response) {
      if (err) return next(err)
      res.status(200).send({ success: true, response });
    });
  }
  //get Report by ID
  get(req, res, next) {
    let { id } = req.params;
    Report.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //Add an Report
  post(req, res, next) {
    // let body = req.body;
    var body = JSON.parse(req.body);
    let doc = new Report(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  //update an Report
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Report.updateOne({ _id: id }, {
      $set: body
    }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  async addNewPhone(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }
    let newReport = await new Report({
      code: req.body.code,
      brand: req.body.brand,
      category: req.body.category,
      color: req.body.color,
      user: req.body.user,
      description: req.body.description,
      linetype: req.body.linetype,
      serialnumber: req.body.serialnumber,
      ownerphonenumber: req.body.ownerphonenumber,
      stolenphonenumber: req.body.stolenphonenumber,
      image: reqFiles,
    });
    newReport.save({}, (error, response) => {
      if (error) return next(error);
      res.status(200).send({ success: true, response });
    });
  }


  // Delete An Report
  delete(req, res, next) {
    let { id } = req.params;
    Report.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
  }
}

const Reportcontroller = new Controller();
module.exports = Reportcontroller;