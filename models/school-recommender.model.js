const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let SchoolRecommender = new Schema({
    zipCode: {
        type: String
    },
    costOfLivingIndex: {
        type: String
    },
    programOfInterest: {
        type: String
    }
});

module.exports = mongoose.model('schoolrecommender', SchoolRecommender);/*Parameters are (MongoDB Collection name, name of Schema object defined in file*/
