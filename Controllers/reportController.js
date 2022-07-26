const Report = require('../Models/reportsSchema')

class Controller {
  //get All the Reports
  
getAllReports(req,res,next){
    Report.find().populate("color").populate("brand").populate("category").populate("user").exec(function (err, response) {
        if (err) return next(err)
          res.status(200).send({success:true,response});
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
    let body = req.body;
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
// Delete An Report
delete(req, res, next) {
  let { id } = req.params;
  Report.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  })}
}

const Reportcontroller = new Controller();
module.exports = Reportcontroller;