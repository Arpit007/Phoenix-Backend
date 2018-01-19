/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');

const schedule = require('../src/schedule');
const request = require('request-promise');
const auth = require('./auth');
const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');
const ObjectID = require('mongoose').Types.ObjectId;
const upload = multer({ dest : xConfig.uploads.dir });

router.post('/create', upload.single('pic'), auth.apiAuth, function (req, res) {
    "use strict";
    const name = req.body.name;
    const sDate = req.body.sDate;
    const eDate = req.body.eDate;
    const description = req.body.desc;
    const tSeat = req.body.tSeat;
    const tags = req.body.tag;
    let path = '';
    if (req.body.file)
        path = req.body.file.path;
    
    return model.event.createEvent(name, sDate, eDate, description, req.userID, path, tSeat , tags)
        .then((event) => {
            let date = event.sDate;
            date.setMinutes(0);
            date.setHours(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return schedule(date, event._id)
                .then(() => {
                    let reply = response(statusCode.Ok);
                    reply.body.eventID = event._id.toString();
                    res.json(reply);
                });
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
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/csv', function (req, res) {

    return model.status.find({ event : req.body.eventID, going: true}, { userID : 1 })
        .populate({
            path : "userID",
            select : "name email mobile"
        })
        .then((result) => {
            let dataset = [];
            result.forEach((item) => {
                dataset.push(item.userID);
            });
            const data = { name : req.body.eventID, dataset : dataset };
            let options = {
                method : 'POST',
                uri : xConfig.pyServer + '/getCSV',
                form : {
                    data : JSON.stringify(data)
                }
            };
            console.log(options);

            request(options)
                .then(function (parsedBody ,  x) {
                    let reply = response(statusCode.Ok);
                    parsedBody = JSON.parse(parsedBody);
                    reply.body.link = parsedBody.path;
                    console.log(parsedBody + x);
                    res.json(parsedBody);
                })
                .catch(function (err) {
                    console.log(err);
                    res.json(response(statusCode.InternalError));
                });
        });
});

router.post('/interest', function (req, res) {
    let eventID = ObjectID(req.body.eventID);
    return model.status.createStatus(eventID, req.userID)
        .then((status) => {
            status.interested = true;
            return status.save()
                .then(() => {
                    return model.event.getEventByID(eventID)
                        .then((event) => {
                            event.interested++;
                            return event.save()
                                .then(() => res.json(response(statusCode.Ok)));
                        });
                });
        }).catch((e) => {
            console.log(e);
            res.json(response(statusCode.InternalError));
        });
});

router.post('/graph', function (req, res) {
    return model.event.getEventByID(ObjectID(req.body.eventID))
        .then((event) => {
            let options = {
                method : 'POST',
                uri : xConfig.pyServer + '/graph',
                form : {
                    eventID : event._id.toString(),
                    positive : event.review.positive,
                    negative : event.review.negative
                }
            };
            
            request(options)
                .then(function (parsedBody) {
                    let reply = response(statusCode.Ok);
                    parsedBody=JSON.parse(parsedBody);
                    reply.body.path = parsedBody.path;
                    res.json(reply);
                })
                .catch(function (err) {
                    console.log(err);
                    res.json(response(statusCode.InternalError));
                });
        });
});

router.post('/going', function (req, res) {
    let eventID = ObjectID(req.body.eventID);
    return model.event.getEventByID(eventID)
        .then((event) => {
            console.log(event.availSeats);
            // if (event.availSeats !=  0) {
            event.availSeats--;
            event.going++;
            return event.save()
                .then(() => {
                    return model.status.createStatus(eventID, req.userID)
                        .then((status) => {
                            status.going = true;
                            return status.save()
                                .then(() => res.json(response(statusCode.Ok)));
                        });
                });
            // }
            // else {
            //     event.waiting++;
            //     return event.save()
            //         .then(() => {
            //             return model.status.createStatus(eventID, req.userID)
            //                 .then((status) => {
            //                     status.waiting = true;
            //                     return status.save()
            //                         .then(() => res.json(response(statusCode.Ok)));
            //                 });
            //         });
            // }
        })
        .catch((e) => {
            console.log(e);
            res.json(response(statusCode.InternalError));
        })
});

module.exports = router;