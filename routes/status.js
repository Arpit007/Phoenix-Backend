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
    const userID = req.userID;

    return model.status.createStatus(eventID , userID)
        .then(()=>{
            res.json(response(statusCode.Ok));
        })
        .catch((e) => res.json(response(e) ));
});

router.post('/id', function (req, res) {
    "use strict";
    const sID = req.body.sID;
    return model.status.getStatusByID(pID)
        .then((status) => {
            let reply = response(statusCode.Ok);
            reply.body.status = status;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/event', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.status.getStatusByEvent(eventID)
        .then((status) => {
            let reply = response(statusCode.Ok);
            reply.body.status = status;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/user', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    return model.status.getStatusForUser(userID)
        .then((status) => {
            let reply = response(statusCode.Ok);
            reply.body.status = status;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});


module.exports = router;