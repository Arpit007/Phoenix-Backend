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

    return model.feedback.createFeedback(userID , eventID , description)
        .then(()=>{
        res.json(response(statusCode.Ok));
        })
        .catch((e) => res.json(response(e) ));
});

router.post('/id', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    const description = req.body.description;

    return model.feedback.getFeedbackByUser(userID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.feedback = feedback;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/event', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.feedback.getFeedbackByEvent(userID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.feedback = feedback;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/userEvent', function (req, res) {
    "use strict";
    const userID = req.body.userID;
    const eventID = req.body.eventID;
    return model.feedback.getFeedbackByUserAndEvent(userID , eventID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.feedback = feedback;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});



module.exports = router;