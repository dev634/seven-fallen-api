const express = require('express');
const router = express.Router();
const Users = require('../Models/Users');


//Get all users

router.get('/users', (req,res) => {
    try{
        
        // if(getUsers.rowCount === 0){
        //   res.status(404).json({
        //     status : res.statusCode,
        //     message : "'Resources not found...'"
        //   });
        // }
        // res.json(getUsers.rows);
        console.log(Users.getAllusers);
    }catch(err){
        res.status(404).json({
            status : res.statusCode,
            message: err.message,
        });
    }
});

module.exports = router;