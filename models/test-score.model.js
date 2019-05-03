const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let TestScore = new Schema({
    testType: {
        type: String
    },
    mathScore: {
        type: Number
    },
    verbalScore: {
        type: Number
    },
    dateTaken: {
        type: Date
    },
    displayDate: {
        type: String
    },
    currentDate: {
        type: Date
    }
});

module.exports = mongoose.model('testscores', TestScore);/*Parameters are (MongoDB Collection name, name of Schema object defined in file*/
