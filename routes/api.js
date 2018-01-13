/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();

const auth = require('./auth');

router.use('/user', require('./user'));
router.use('/event_by_id', require('./event'));



module.exports = router;