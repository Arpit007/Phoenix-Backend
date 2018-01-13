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


router.post('/feedback', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    const description = req.body.description;

    return model.feedback.storeFeedback(userID , eventID , description)
        .catch((e) => res.json(response(e) ));
});

router.post('/getFeedbackByUserId', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    const description = req.body.description;

    return model.feedback.getFeedbackByUser(userID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.userID = feedback.userID.toString();
            reply.body.eventID = feedback.eventID.toString();
            reply.body.description = feedback.desc.toString();
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/getFeedbackByEvent', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.feedback.getFeedbackByEvent(userID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.userID = feedback.userID.toString();
            reply.body.eventID = feedback.eventID.toString();
            reply.body.description = feedback.desc.toString();
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/getFeedbackByUserAndEvent', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    return model.feedback.getFeedbackByUserAndEvent(userID , eventID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.userID = feedback.userID.toString();
            reply.body.eventID = feedback.eventID.toString();
            reply.body.description = feedback.desc.toString();
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});



module.exports = router;