const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../Models/User');

router.get('/user/find/:id', User.getUser);

module.exports = router;