const express = require('express');//use "nodemon server" to start server
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');
const mongoose = require ('mongoose');/*returns Singleton. Mongoose is a library that allows us to deal in an object-oriented way with the
database.*/

const projectRoutes = express.Router();

const PORT = 4000;
//mongod filepath: C:\Program Files\MongoDB\Server\4.0\bin
let Application = require('./models/application.model');
let TestScore = require('./models/test-score.model');
let School = require('./models/school.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Project', {useNewUrlParser: true});
//mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;/*Mongoose creates a default connection when you call mongoose.connect(). You can access the default
  connection using mongoose.connection.*/

connection.once('open', function (){
    console.log("MongoDB database connection established successfully");
})

projectRoutes.route('/applications').get(function(req, res){//get all
  Application.find(function(err, applications) {
      if (err) {
          console.log(err);
      } else {
          res.json(applications);
      }
  });
});

projectRoutes.route('/testScores').get(function(req, res){//get all
  TestScore.find(function(err, testScores) {
      if (err) {
          console.log(err);
      } else {
          res.json(testScores);
      }
  });
});

projectRoutes.route('/applications/:id').get(function(req, res) {// get one by id
      let id = req.params.id;
      Application.findById(id, function(err, application) {
          res.json(application)
      });
});

projectRoutes.route('/testScores/:id').get(function(req, res) {// get one by id
      let id = req.params.id;
      TestScore.findById(id, function(err, testScore) {
          res.json(testScore)
      });
});

projectRoutes.route('/applications/add').post(function(req, res) {
    let application = new Application(req.body);
    application.save()
               .then(application => {
                   res.status(200).json({'application': 'application added successfully'});
               })
               .catch(err =>  {
                    res.status(400).send('adding new application failed');
               });
});

projectRoutes.route('/testScores/add').post(function(req, res) {
    let testScore = new TestScore(req.body);
    testScore.save()
               .then(testScore => {
                   res.status(200).json({'TestScore': 'test score added successfully'});
               })
               .catch(err =>  {
                    res.status(400).send('adding new test score failed');
               });
});

projectRoutes.route('/applications/update/:id').post(function(req, res) {
    Application.findById(req.params.id, function(err, application) {
                if (!application)
                    res.status(404).send('data is not found');
                else
                    application.school = req.body.school;
                    application.status = req.body.status;

                application.save().then(application => {
                    res.json('Application updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
});

projectRoutes.route('/testScores/update/:id').post(function(req, res) {
    TestScore.findById(req.params.id, function(err, testScore) {
                if (!testScore)
                    res.status(404).send('data is not found');
                else
                    testScore.testType = req.body.testType;
                    testScore.mathScore = req.body.mathScore;
                    testScore.verbalScore = req.body.verbalScore;

                testScore.save().then(testScore => {
                    res.json('Test Score updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
});

projectRoutes.route('/applications/delete/:id').delete(function(req, res) {// delete one by id
      let id = req.params.id;
      Application.findByIdAndRemove(id, function(err, application) {
        if (err) {
            console.log(err);
        } else {
            res.json(application);
        }
      });
});

projectRoutes.route('/testScores/delete/:id').delete(function(req, res) {// delete one by id
      let id = req.params.id;
      TestScore.findByIdAndRemove(id, function(err, testScore) {
        if (err) {
            console.log(err);
        } else {
            res.json(testScore);
        }
      });
});

projectRoutes.route('/searchSchools/:zipCode/:costOfLiving/:programOfInterest').get(function(req, res){
      let searchZipCode = req.params.zipCode;
      let searchCostOfLiving = req.params.costOfLiving;
      let searchProgramsOfInterest = req.params.programOfInterest;
      console.log(searchCostOfLiving);
      /*console.log(searchCostOfLiving);
      console.log(searchProgramsOfInterest);*/
      //searchProgramsOfInterest/i
      //{ $elemMatch: {searchProgramsOfInterest}
      //School.find({ zipCode: {}, costOfLiving: {}, programsOffered: new RegExp(searchProgramsOfInterest, 'i') }, function(err, schools) {
      //{ "$regex": searchProgramsOfInterest, "$options": i }

      School.aggregate(
      [
        {$match: {
         zipCode: {$gte: String(searchZipCode - 500), $lte: String(searchZipCode + 500)},
         costOfLivingIndex: { $gte: String(searchCostOfLiving - 100), $lte: String(searchCostOfLiving + 100)}}}
        /* Match first to reduce documents to those where the array contains the match
      { $match: {
        zipCode: { $gte: searchZipCode - 1000, $lte: searchZipCode + 1000},
        costOfLiving: { $gte: searchCostOfLiving - 50, $lte: searchCostOfLiving + 50},
        //programsOffered: new RegExp(searchProgramsOfInterest, 'i')
        programsOffered: /searchProgramsOfInterest/i
        }},
        // Unwind to "de-normalize" the document per array element
        { $unwind: "$programsOffered" },
        // Now filter those document for the elements that match
        { $match: {
          programsOffered: /searchProgramsOfInterest/i
        }},
        // Group back as an array with only the matching elements
        { $group: {
          _id: "$_id",
          name: { $first: "$name" },
          schoolUrl: { $first: "$schoolUrl" },
          zipCode: { $first: "$zipCode" },
          costOfLiving: { $first: "$costOfLiving" },
          programsOffered: { $push: "$programsOffered" }
        }}*/
      ],
          function(err, schools) {
          if (err) {
              console.log(err);
          } else {
            res.json(schools);
          }
      });
    });

app.use('/', projectRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
