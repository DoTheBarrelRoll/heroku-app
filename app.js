// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Database config and connection
const dbConfig = require('./config/dbconnection.js');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Tervetuloa Opiskelija API:n"});
});

require('./routes/student.routes.js')(app);
require('./routes/student.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app;
