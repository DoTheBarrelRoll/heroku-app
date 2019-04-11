var mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({
  course_code: {type: String, required: true},
  grade: {type: Number, required: true, min: 0, max: 5}
});

module.exports = gradeSchema;
