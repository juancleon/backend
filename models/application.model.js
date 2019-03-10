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

module.exports = mongoose.model('applications', Application);/*Parameters are (MongoDB Collection name, name of Schema object defined in file)*/
