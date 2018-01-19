var express = require('express');
var router = express.Router();
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('193031Aw2btqWboT55a5a357f');
/* GET home page. */
router.get('/', function(req, res, next) {
	sendOtp.send("919024444807", "PHOENX" , function (error, data, response) {
	  console.log(data);
	});
	
});

module.exports = router;
