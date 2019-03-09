const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let Application = new Schema({
    school: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('Application', Application);
