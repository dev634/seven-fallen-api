const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../Models/User');

router.get('/user/find/:id', User.getUser);
router.post('/user/subscribe', User.createUser);
router.patch('/user/update/:id', User.updateUser);

module.exports = router;