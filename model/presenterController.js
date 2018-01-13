/**
 * Created by StarkX on 13-Jan-18.
 */
const presenter = require('./presenter');
const statusCode = require('./statusCode');

presenter.getPresenterByID = (ID, throwOnNull) => {
    return presenter.findById(ID)
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((presenter) => {
            if (!presenter && throwOnNull)
                throw statusCode.NotFound;
            return presenter;
        });
};

presenter.getPresenterByEvent = (eventID) => {
    return presenter.find({ eventID : eventID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((presenters) => {
            return presenters;
        });
};

presenter.getPresenterByUser = (userID) => {
    return presenter.find({ userID : userID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return [];
        }).then((presenters) => {
            return presenters;
        });
};

presenter.getPresenterByEventAndUser = (eventID, userID, throwOnNull) => {
    return presenter.findOne({ eventID : eventID, userID : userID })
        .catch((e) => {
            "use strict";
            console.log(e);
            return null;
        }).then((presenter) => {
            if (!presenter && throwOnNull)
                throw statusCode.NotFound;
            return presenter;
        });
};
presenter.createPresenter = (userID, eventID , sDate , eDate) => {
    return presenter
        .create({
            userID : userID,
            eventID : eventID,
            sDate : sDate,
            eDate : eDate
        });
};

module.exports = presenter;