const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    eMail: {
        type: String
    },
});

module.exports = mongoose.model('users', User);/*Parameters are (MongoDB Collection name, name of Schema object defined in file)*/
