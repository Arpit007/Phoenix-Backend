/**
 * Created by StarkX on 19-Jan-18.
 */
const schedule = require('node-schedule');
const notify = require('./notify');
const model = require('../model/model');
const ObjectID = require('mongoose').Schema.ObjectId;


module.exports = (date, eventID) => {
    new Promise((resolve) => {
        resolve()
    }).then(() => {
        schedule.scheduleJob(date, function (y) {
            return model.event.getEventByID(ObjectID(y))
                .then((event) => {
                    return model.status.getGoing(event._id)
                        .then((users) => {
                            let ppl = [];
                            users.forEach((user) => {
                                ppl.push({ name : user.userID.name, email : user.userID.email });
                            });
                            return notify(event.name, ppl);
                        });
                })
                .catch((e) => {
                    console.log(e);
                })
        }.bind(null, eventID));
    }).catch((e) => {
        console.log(e);
    })
};