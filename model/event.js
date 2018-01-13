/**
 * Created by StarkX on 13-Jan-18.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const eventSchema = new Schema({
    name : { type : String, required : true },
    sDate : { type : Date, required : true },
    eDate : { type : Date, required : true },
    description : String,
    venue : {
        name : String,
        loc : []
    },
    image : String,
    url : String,
    organiser : { type : ObjectID, ref : 'User', required : true, index : true },
    tags : [ { type : String } ],
    presenter : [ { type : ObjectID, ref : 'Presenter' } ],
    availSeats : { type : Number, default : 0 },
    totalSeats : { type : Number, default : 0 },
    interested : { type : Number, default : 0 },
    waitList : { type : Number, default : 0 },
    going : { type : Number, default : 0 },
    review : {
        positive : { type : Number, default : 0 },
        negative : { type : Number, default : 0 }
    }
});

module.exports = mongoose.model('Event', eventSchema);