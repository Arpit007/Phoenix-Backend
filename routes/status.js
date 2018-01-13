/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('193031Aw2btqWboT55a5a357f');


/* GET home page. */

router.post('/', function (req, res) {
    "use strict";
    const otp = req.body.otp;
    const mobile = req.body.mobile;

    sendOtp.send(mobile, "PHOENX" , otp, function (error, data, response) {
        if(response.type == "success") {
          return res.json(response(statusCode.Ok));
        }else {
          return res.json(response(statusCode.NotFound));
        }
    });

});



module.exports = router;