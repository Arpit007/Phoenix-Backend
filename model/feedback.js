/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userID : { type : ObjectID, ref : 'User', required : true, index : true },
    eventID : { type : ObjectID, ref : 'Event', required : true, index : true },
    desc : String
});

module.exports = mongoose.model('Feedback', feedbackSchema);