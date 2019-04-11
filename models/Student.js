var mongoose = require('mongoose');
var gradeSchema = require('./Grade.js');
var studentSchema = new mongoose.Schema({
  student_code: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  study_points: {type: Number, required: true, min: 0},
  grades: [gradeSchema]
});

var Student = mongoose.model('student', studentSchema);

module.exports = Student;
