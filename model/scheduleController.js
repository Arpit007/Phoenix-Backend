/**
 * Created by StarkX on 13-Jan-18.
 */
const schedule = require('./schedule');
const statusCode = require('./statusCode');

schedule.getScheduleByID = (id, throwOnNull = false) => {
    return schedule
        .findById(id)
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((schedule) => {
            "use strict";
            if (!schedule && throwOnNull)
                throw statusCode.NotFound;
            return schedule;
        });
};

schedule.getScheduleByEvent = (eventID) => {
    return schedule.findOne({ eventID : eventID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((schedule) => {
            return schedule;
        });
};

schedule.createSchedule = (eventID) => {
    return schedule
        .create({
            eventID : eventID
        });
};

module.exports = event;