const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let School = new Schema({
    name: {
        type: String
    },
    schoolUrl: {
        type: String
    },
    zipCode: {
        type: Number
    },
    costOfLivingIndex: {
        type: Number
    },
    programsOffered: {
        type: [String]
    }
});
//School.index({programsOffered: 'text'});
module.exports = mongoose.model('schools', School);/*Parameters are (MongoDB Collection name, name of Schema object defined in file)*/
