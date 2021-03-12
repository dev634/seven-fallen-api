const express = require('express');
const Users = require('../Models/Users');
const router = express.Router();
const Users = require('../Models/Users');


//Get all users

router.get('/users', async (req,res) => {
    try{
        const users = new Users();
        // if(getUsers.rowCount === 0){
        //   res.status(404).json({
        //     status : res.statusCode,
        //     message : "'Resources not found...'"
        //   });
        // }
        // res.json(getUsers.rows);
        console.log(users);
    }catch(err){
        res.status(404).json({
            status : res.statusCode,
            message: err.message,
        });
    }
});

module.exports = router;