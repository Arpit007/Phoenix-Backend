/**
 * Created by StarkX on 13-Jan-18.
 */
const event = require('./event');
const statusCode = require('./statusCode');

event.getEventByID = (id, throwOnNull = false) => {
    return event
        .findById(id)
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((event) => {
            "use strict";
            if (!event && throwOnNull)
                throw statusCode.NotFound;
            return event;
        });
};

event.createEvent = (name, sDate, eDate, description, organiserID) => {
    return event
        .create({
            name : name,
            sDate : sDate,
            eDate : eDate,
            description : description,
            organiser : organiserID
        });
};

event.getEventByOrganiser = (userID) => {
    return event.find({ organiser : userID })
        .catch((e) => {
            console.log(e);
            return [];
        })
        .then((events) => {
            return events;
        })
};

event.getLiveEvent = () => {
    let today = new Date();
    return event.find({ sDate : { $gte : today }, eDate : { $lte : today } })
        .catch((e) => {
            console.log(e);
            return [];
        })
        .then((events) => {
            return events;
        })
};

module.exports = event;