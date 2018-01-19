/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();

const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');


router.post('/create', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    const desc = req.body.desc;
    
    return model.feedback.createFeedback(req.userID, eventID, desc)
        .then(() => {
            let options = {
                method : 'POST',
                uri : xConfig.pyServer + "/feedback",
                form : {
                    eventID : req.body.eventID,
                    feedback : desc
                }
            };
            
            return request(options)
                .then((we) => {
                    we = JSON.parse(we);
                    return model.event.getEventByID(eventID)
                        .then((event) => {
                            if (we.data)
                                event.review.positive += 1;
                            else event.review.negative += 1;
                            return event.save();
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .then(() => res.json(response(statusCode.Ok)))
        .catch((e) => res.json(response(e)));
});

router.post('/user', function (req, res) {
    "use strict";
    const userID = req.userID;
    
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
    return model.feedback.getFeedbackByEvent(eventID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.feedback = feedback;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/userEvent', function (req, res) {
    "use strict";
    const eventID = req.body.eventID;
    return model.feedback.getFeedbackByUserAndEvent(req.userID, eventID)
        .then((feedback) => {
            let reply = response(statusCode.Ok);
            reply.body.feedback = feedback;
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});


module.exports = router;