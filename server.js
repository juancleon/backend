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
let SchoolRecommenderSearchResult = require('./models/school-recommender-search-results.model');
let User = require('./models/user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Project', {useNewUrlParser: true});
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

projectRoutes.route('/savedSearches').get(function(req, res){//get all
  SchoolRecommenderSearchResult.find(function(err, schoolRecommenderSearchResult) {
      if (err) {
          console.log(err);
      } else {
          res.json(schoolRecommenderSearchResult);
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

projectRoutes.route('/savedSearches/:id').get(function(req, res) {// get one by id
      let id = req.params.id;
      SchoolRecommenderSearchResult.findById(id, function(err, schoolRecommenderSearchResult) {
          res.json(schoolRecommenderSearchResult)
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

projectRoutes.route('/savedSearches/add').post(function(req, res) {
    let schoolRecommenderSearchResult = new SchoolRecommenderSearchResult(req.body);
    schoolRecommenderSearchResult.save()
               .then(schoolRecommenderSearchResult => {
                   res.status(200).json({'SchoolRecommenderSearchResult': 'school recommender search result added successfully'});
               })
               .catch(err =>  {
                    res.status(400).send('adding new school recommender search result failed');
               });
});

projectRoutes.route('/applications/update/:id').post(function(req, res) {
    Application.findById(req.params.id, function(err, application) {
                if (!application)
                    res.status(404).send('data is not found');
                else
                    application.school = req.body.school;
                    application.status = req.body.status;

                application.save()
                    .then(application => {
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

{/*projectRoutes.route('/savedSearches/update/:id').post(function(req, res) {
    SchoolRecommenderSearchResult.findById(req.params.id, function(err, schoolRecommenderSearchResult) {
                if (!schoolRecommenderSearchResult)
                    res.status(404).send('data is not found');
                else
                    schoolRecommenderSearchResult.zipCode = req.body.zipCode;
                    schoolRecommenderSearchResult.costOfLivingIndex = req.body.costOfLivingIndex;
                    schoolRecommenderSearchResult.programOfInterest = req.body.programOfInterest;
                    schoolRecommenderSearchResult.schools = req.body.schools;

                schoolRecommenderSearchResult.save().then(schoolRecommenderSearchResult => {
                    res.json('School Recommender Search Result updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
});*/}

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

projectRoutes.route('/savedSearches/delete/:id').delete(function(req, res) {// delete one by id
      let id = req.params.id;
      SchoolRecommenderSearchResult.findByIdAndRemove(id, function(err, schoolRecommenderSearchResult) {
        if (err) {
            console.log(err);
        } else {
            res.json(schoolRecommenderSearchResult);
        }
      });
});

projectRoutes.route('/user/register').post(function(req, res) {
    let userName = req.body.userName;
    User.findOne({userName: userName}).then(user => {
        if (user) {
          return res.status(400).json({userName: "User name already exists"})
        }

        let newUser = new User(req.body);

        newUser.save()
            .then(user => {
                res.status(200).json({'User': 'New user added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new User failed');
            })
        });
});

projectRoutes.route('/searchSchools/:zipCode/:costOfLiving/:programOfInterest').get(function(req, res){

      let searchZipCode = req.params.zipCode;
      let searchCostOfLiving = req.params.costOfLiving;
      let searchProgramsOfInterest = req.params.programOfInterest;

      if (searchProgramsOfInterest==='null')
      {
        searchProgramsOfInterest='';
      }

      //console.log(searchCostOfLiving.valueOf());
      School.aggregate(
      [
        {$match: {
         $or:[{
         zipCode: {$gte: String(searchZipCode - 9910), $lte: String(Number(searchZipCode) + 9910)},
         costOfLivingIndex: {$gte:String(searchCostOfLiving - 50), $lte: String(Number(searchCostOfLiving) + 50)},
         // Match first to reduce documents to those where the array contains the match
         //programsOfferedArray: new RegExp(searchProgramsOfInterest, 'i')
         //programsOfferedArray: /searchProgramsOfInterest/i
         programsOfferedArray: {$regex: (searchProgramsOfInterest.valueOf()), $options: 'i'}}]
       }},
        // Unwind to "de-normalize" the document per array element
        {$unwind: "$programsOfferedArray"},
        // Now filter the documents for the elements that match
        { $match: {
          programsOfferedArray: {$regex: (searchProgramsOfInterest.valueOf()), $options: 'i'}
        }},
        // Group back as an array with only the matching elements
        { $group: {
          _id: "$_id",
          name: { $first: "$name"},
          schoolURL: { $first: "$schoolURL"},
          state: { $first: "$state"},
          zipCode: { $first: "$zipCode"},
          programsOfferedArray: { $push: "$programsOfferedArray"},
          costOfLivingIndex: { $first: "$costOfLivingIndex"}
        }}
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
