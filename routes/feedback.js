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


router.post('/store_feedback', function (req, res) {
    "use strict";
    const userId = req.body.userID;
    const eventId = req.body.eventID;
    const description = req.body.description;


    return model.feedback.storeFeedback(userID , eventID , description)
        .catch((e) => res.json(response(e)));

});

module.exports = router;