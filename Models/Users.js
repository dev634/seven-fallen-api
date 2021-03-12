const pool = require('../db');

exports.getAllUsers = () => {
    return await pool.query("SELECT username,email FROM users");
};