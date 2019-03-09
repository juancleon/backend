const express = require('express');//use nodemon server to start server
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');
const mongoose = require ('mongoose');//returns Singleton. Mongoose is a library that allows us to deal in an object-oriented way with the database.
const projectRoutes = express.Router();
const PORT = 4000;

let Application = require('./application.model');
let TestScore = require('./test-score.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Project', {useNewUrlParser: true});
const connection = mongoose.connection;/*Mongoose creates a default connection when you call mongoose.connect(). You can access the default
  connection using mongoose.connection.*/

connection.once('open', function (){
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
