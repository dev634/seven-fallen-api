const express = require('express');
const router = express.Router();
const Users = require('../Models/Users');


//Get all users

router.get('/users', Users.getAllUsers);

module.exports = router;