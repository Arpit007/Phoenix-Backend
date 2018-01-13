/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;
const scheduleSchema = new Schema({
    eventID : { type : ObjectID, ref : 'Event', required : true, index : true },
    presenters : [ { type : ObjectID, ref : 'Presenter' } ]
});

module.exports = mongoose.model('Schedule', scheduleSchema);