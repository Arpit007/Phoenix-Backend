/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();

const auth = require('./auth');

router.use('/user', require('./user'));
router.use('/event', auth.apiAuth, require('./event'));
router.use('/feedback', auth.apiAuth, require('./feedback'));



module.exports = router;