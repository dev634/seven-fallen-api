const pool = require('../db');

const getAllUsers = (req,res) => {
    pool.query('SELECT id,username,email FROM users', (err,results) => {
        if(err){
            err.message = "Not found";
            res.status(404).json(err.message);
        }
        res.status(200).json(results.rows);
    });
}



module.exports = {
    getAllUsers
};