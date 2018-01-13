/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('./auth');
const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');

const upload = multer({ dest : xConfig.uploads.dir });

    router.post('/create', upload.single('pic'), auth.apiAuth, function (req, res) {
    "use strict";
    const name = req.body.name;
    const sDate = req.body.sDate;
    const eDate = req.body.eDate;
    const description = req.body.desc;
    const tSeat = req.body.tSeat;
    let path = '';
    if (req.body.file)
        path = req.body.file.path;
    
    return model.event.createEvent(name, sDate, eDate, description, req.userID, path , tSeat)
        .then((event) => {
            let reply = response(statusCode.Ok);
            reply.body.eventID = event._id.toString();
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.use(auth.apiAuth);

router.post('/event', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    
    return model.event.getEventByID(eventID, true)
        .then((event) => {
            let reply = response(statusCode.Ok);
            reply.body.event = event;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/organised', function (req, res) {
    "use strict";
    return model.event.getEventByOrganiser(req.userID)
        .then((event) => {
            let reply = response(statusCode.Ok);
            reply.body.events = event;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/user', function (req, res) {
    "use strict";
    return model.status.getStatusForUser(req.userID)
        .then((events) => {
            let interested = [], going = [], waiting = [];
            events.forEach((event) => {
                if (event.going)
                    going.push(event);
                else if (event.waiting)
                    waiting.push(event);
                else interested.push(event);
            });
            let reply = response(statusCode.Ok);
            reply.body.going = going;
            reply.body.waiting = waiting;
            reply.body.interested = interested;
            res.json(reply);
        });
});

router.post('/live', function (req, res) {
    return model.event.getLiveEvent()
        .then((events) => {
            let reply = response(statusCode.Ok);
            reply.events = events;
            // console.log(events);
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

module.exports = router;