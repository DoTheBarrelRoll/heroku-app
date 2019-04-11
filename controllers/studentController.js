const Student = require('../models/Student.js');


exports.findOne = (req, res) => {
  Student.findById(req.params.studentId)
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "Student not found with specified Id" + req.params.studentId
      });
    }
    res.send(student);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Student not found with specified Id " + req.params.studentId
      })
    }
    return res.status(500).send({
      message: "Could not delete note with id " + req.params.studentId
    });
  })
};

exports.findAll = (req, res) => {
  Student.find({})
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "Students not found"
      });

    }
    res.send(student);
  })
};

exports.delete = (req, res) => {
  Student.findOneAndRemove({_id: req.params.studentId})
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "Student not found with specified Id " + req.params.studentId
      });
    }
    res.send("Deleted Successfully " + student)
  })
};

exports.update = (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, {
    student_code: req.body.student_code,
    name: req.body.name,
    email: req.body.email,
    grades: req.body.grades,
    study_points: req.body.study_points
  }, {new: true})
  .then(student => {
    if(!student) {
      res.status(404).send({
        message: "Student with given ID not found"
      });
    }
    res.send("Student succesfully updated, \n" + student);
  }).catch(err => {
    res.status(404).send(err)
  });
};

exports.create = (req, res) => {
  var oppilas = new Student({
    student_code: req.body.student_code,
    name: req.body.name,
    email: req.body.email,
    grades: req.body.grades,
    study_points: req.body.study_points
  });
  oppilas.save()
  .then(student => {
    if(!student) {
      res.status(404).send({
        message: "Request body was empty, no student added"
      });
    }
    res.status(200).send(student);
  }).catch(err => {
    res.status(404).send("An error occurred, " + err)
  });
};

exports.updateGrade = (req, res) => {
  Student.findOneAndUpdate({_id: req.params.studentId, 'grades._id': req.params.gradeId }, {
    "$set": { "grades.$.grade": req.body.grade}
  })
  .then(grade => {
    if(!grade){
      res.status(404).send("No grade found with given ID " + req.params.gradeId)
    }
    res.send("Grade updated succesfully, " + grade);
  }).catch(err => {
    if(err){
      res.send(err);
    }
  })
  };

exports.addGrade = (req, res) => {
  Student.findOneAndUpdate({_id: req.params.studentId}, 
    {$push: {grades: req.body}
  })
  .then(grade => {
    if(!grade){
      res.status(404).send("No grade found in request body");
    }
    res.send("Grade added succesfully, " + req.body);
  }) 
};