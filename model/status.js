/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const statusSchema = new Schema({
    event : { type : ObjectID, ref : 'Event', required : true },
    userID : { type : ObjectID, ref : 'User', required : true },
    interested : { type : Boolean, default : false },
    going : { type : Boolean, default : false },
    waiting : { type : Boolean, default : false }
}, {
    timestamps : true
});

module.exports = mongoose.model('Status', statusSchema);