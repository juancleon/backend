const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let TestScore = new Schema({
    testType: {
        type: String
    },
    score: {
        type: Number
    }
});

module.exports = mongoose.model('TestScore', TestScore);
