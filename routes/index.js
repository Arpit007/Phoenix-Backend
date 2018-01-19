/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: xConfig.appName });
});

router.get('/my', function(req, res, next) {
  res.render('index', { title: xConfig.appName });
});

module.exports = router;
