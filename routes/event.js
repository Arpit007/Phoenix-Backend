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


router.post('/store_event', function (req, res) {
    "use strict";
    const name = req.body.name;
    const sDate = req.body.sDate;
    const eDate = req.body.eDate;
    const description = req.body.description;
    return model.event.storeFeedback(name , sDate , eDate , description)
        .catch((e) => res.json(response(e)));
});
//
// router.post('/event_by_id', function (req, res) {
//     "use strict";
//     const eventID = req.body.eventID;
//
//     return model.event.getEventByID(eventID)
//         .catch((e) => res.json(response(e)));
// });

module.exports = router;