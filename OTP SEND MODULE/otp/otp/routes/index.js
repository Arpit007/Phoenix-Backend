var express = require('express');
var router = express.Router();
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('193031Aw2btqWboT55a5a357f');
/* GET home page. */
router.get('/', function(req, res, next) {
	sendOtp.send("919024444807", "PHOENX" , 1485, function (error, data, response) {
	  console.log(data);
	});
	// sendOtp.verify("919660729583", "4365", function (error, data, response) {
	//   console.log(data); // data object with keys 'message' and 'type'
	//   if(data.type == 'success') console.log('OTP verified successfully')
	//   if(data.type == 'error') console.log('OTP verification failed')
	// });
});

module.exports = router;
