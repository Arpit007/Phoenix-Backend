/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

// const socket = require('../src/socket');
const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');

router.post('/status', function (req, res) {
    "use strict";

    const eventID = req.body.eventID;
    const userID = req.body.userID;
    const sTime = req.body.sTime;
    const eTime = req.body.eTime;
    return model.schedule.createPresenter(eventID , userID , sTime , eTime)
        .then(()=>{
            res.json(response(statusCode.Ok));
        })
        .catch((e) => res.json(response(e) ));
});
router.post('/id', function (req, res) {
    "use strict";
    const pID = req.body.pID;
    return model.presenter.getPresenterByID(pID)
        .then((presenter) => {
            let reply = response(statusCode.Ok);
            reply.body.presenter = presenter;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});
router.post('/event', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.presenter.getPresenterByEvent(eventID)
        .then((presenter) => {
            let reply = response(statusCode.Ok);
            reply.body.presenter = presenter;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});
router.post('/user', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    return model.presenter.getPresenterByUser(userID)
        .then((presenter) => {
            let reply = response(statusCode.Ok);
            reply.body.presenter = presenter;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});
router.post('/userEvent', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    return model.presenter.getPresenterByUser(eventID , userID)
        .then((presenter) => {
            let reply = response(statusCode.Ok);
            reply.body.presenter = presenter;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

module.exports = router;