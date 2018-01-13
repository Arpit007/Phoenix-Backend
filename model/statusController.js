/**
 * Created by StarkX on 13-Jan-18.
 */
const status = require('./status');
const statusCode = require('./statusCode');

status.getStatusByID = (id, throwOnNull = false) => {
    return status
        .findById(id)
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((status) => {
            "use strict";
            if (!status && throwOnNull)
                throw statusCode.NotFound;
            return status;
        });
};

status.createStatus = (eventID, userID) => {
    return event
        .create({
            eventID : eventID,
            userID : userID
        });
};

status.getStatusByEvent = (eventID) => {
    return status
        .findBy({ event : eventID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((status) => {
            "use strict";
            if (!status && throwOnNull)
                throw statusCode.NotFound;
            return status;
        });
};

status.getStatusForUser = (userID) => {
    return status
        .findBy({ userID : userID })
        .populate("event")
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((status) => {
            "use strict";
            return status;
        });
};

module.exports = event;