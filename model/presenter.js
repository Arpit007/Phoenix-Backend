/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const presenterSchema = new Schema({
    userID : { type : ObjectID, ref : 'User', required : true, index : true },
    eventID : { type : ObjectID, ref : 'Event', required : true, index : true },
    sTime : Date,
    eTime : Date,
    desc: String

});

module.exports = mongoose.model('Presenter', presenterSchema);