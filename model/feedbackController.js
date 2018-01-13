/**
 * Created by StarkX on 13-Jan-18.
 */
const feedback = require('./feedback');
const statusCode = require('./statusCode');

feedback.getFeedbackByUser = (userID) => {
    return feedback.find({ userID : userID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((events) => {
            return events;
        })
};

feedback.getFeedbackByEvent = (eventID) => {
    return feedback.find({ eventID : eventID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((events) => {
            return events;
        })
};
feedback.getFeedbackByUserAndEvent = (userID, eventID) => {
    return feedback.find({ userID : userID, eventID : eventID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((events) => {
            return events;
        })
};

feedback.createFeedback = (userID, eventID, description) => {
    return feedback
        .create({
            userID : userID,
            eventID : eventID,
            desc : description
        });
};

module.exports = feedback;