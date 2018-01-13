/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const socket = require('../src/socket');
const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');


router.post('/feedback', function (req, res) {
    "use strict";
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const desc = req.body.desc;


    return model.feedback.storeFeedback(userId , eventId , desc)
        .then()

    return model.user.createUser(name , mobile, email, password)
        .then((user) => {
            let reply = response(statusCode.Ok);
            reply.body.token = generateToken(user);
            reply.body.userID = user._id.toString();
            reply.body.userName = user.userName;
            reply.body.email = user.email;

            return model.conversation.getGlobalConversation()
                .then((conversation) => {
                    let work = (conversation) => {
                        conversation.participants.push(user._id);
                        return conversation.save()
                            .then(() => res.json(reply));
                    };
                    if (!conversation)
                        return model.conversation.createConversation()
                            .then((conversation) => work(conversation));
                    else return new Promise(resolve => resolve())
                        .then(() => work(conversation));
                })
                .then(() => socket.NotifyNewSignUp())
                .catch((e) => {
                    console.log(e);
                    throw statusCode.InternalError;
                })
        })
        .catch((e) => res.json(response(e)));
});

module.exports = router;