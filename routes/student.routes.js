

module.exports = (app) => {
  const students = require('../controllers/studentController.js');
  const auth = require ('../auth/authController.js')
  const authorize = require('../auth/checkToken');

  // Register for authentication
  app.post('/register', auth.register);
  
  // Verify login username and password and receive token
  app.post('/login', auth.login);

  // Create a new student
  app.post('/students', authorize.verifyToken, students.create);

  // Retrieve all students
  app.get('/students', students.findAll);

  // Retrieve a single student with studentId
  app.get('/students/:studentId', students.findOne);

  // Update a student with studentId
  app.put('/students/:studentId', authorize.verifyToken, students.update);

  // Delete a student with studentId
  app.delete('/students/:studentId', authorize.verifyToken, students.delete);

  //Update a grade
  app.put('/students/:studentId/:gradeId', authorize.verifyToken, students.updateGrade);

  //Add a grade
  app.post('/students/:studentId', authorize.verifyToken, students.addGrade);
}
