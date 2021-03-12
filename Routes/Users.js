const express = require('express');
const router = express.Router();


//Get all users

router.get('/users', async (req,res) => {
    try{
        const getUsers = await pool.query("SELECT username,email FROM users");
        if(getUsers.rowCount === 0){
          res.status(404).json({
            status : res.statusCode,
            message : "'Resources not found...'"
          });
        }
        res.json(getUsers.rows);
    }catch(err){
        res.status(404).json({
            status : res.statusCode,
            message: err.message,
        });
    }
});

module.exports = router;