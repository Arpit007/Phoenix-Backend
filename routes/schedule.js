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

router.post('/schedule', function (req, res) {
    "use strict";

    const eventID = req.body.eventID;
    return model.schedule.createSchedule( eventID)
        .then(()=>{
            res.json(response(statusCode.Ok));
        })
        .catch((e) => res.json(response(e) ));
});
router.post('/id', function (req, res) {
    "use strict";
    const sID = req.body.sID;
    return model.schedule.getScheduleByID(sID)
        .then((schedule) => {
            let reply = response(statusCode.Ok);
            reply.body.schedule = schedule;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});
router.post('/event', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.schedule.getScheduleByEvent(eventID)
        .then((schedule) => {
            let reply = response(statusCode.Ok);
            reply.body.schedule = schedule;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

module.exports = router;