const { response } = require('express');
const pool = require('../db');

const getAllUsers = (req,res) => {
    pool.query('SELECT username,email FROM users', (err,results) => {
        if(err){
            throw err
        }
        res.status(200).json(results.rows);
    });
}



module.exports = {
    getAllUsers
};