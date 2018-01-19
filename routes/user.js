/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const auth = require('./auth');
const response = require('../model/response');
const statusCode = require('../model/statusCode');
const model = require('../model/model');

const upload = multer({ dest : xConfig.uploads.dir });

const generateToken = (user) => {
    "use strict";
    return jwt.sign({ userID : user._id.toString() }, xConfig.crypto.TokenKey, { expiresIn : xConfig.crypto.JwtExpiration * 60 * 60 });
};

router.post('/signup', function (req, res) {
    "use strict";
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const password = req.body.password;
    
    return model.user.createUser(name, mobile, email, password)
        .then((user) => {
            let reply = response(statusCode.Ok);
            reply.body = {
                token : generateToken(user),
                userID : user._id.toString(),
                name : user.name,
                picLink : user.picLink,
                email : user.email
            };
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/signin', function (req, res) {
    "use strict";
    const email = req.body.email;
    const password = req.body.password;
    
    return model.user.authorise(email, password)
        .then((user) => {
            let reply = response(statusCode.Ok);
            reply.body.token = generateToken(user);
            reply.body.userID = user._id.toString();
            reply.body.name = user.name;
            reply.body.picLink = user.picLink;
            reply.body.email = user.email;
            
            res.json(reply);
        })
        .catch((e) => res.json(response(e)));
});

router.post('/pic', upload.single('pic'), auth.apiAuth, function (req, res) {
    return model.user.getUserByID(req.userID, true)
        .then((user) => {
            user.picLink = req.file.path;
            return user.save()
                .then(() => {
                    res.json(response(statusCode.Ok));
                });
        })
        .catch((e) => res.json(response(e)));
});

module.exports = router;