/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;
const userSchema = new Schema({
    name : { type : String, required : true },
    password : { type : String, required : true },
    picLink : String,
    email : { type : String, required : true, index : true },
    mobile : { type : String, require : true, index : true },
    social : {
        fb : String,
        linkedIn : String,
        twitter : String,
        github : String
    }
});

module.exports = mongoose.model('User', userSchema);