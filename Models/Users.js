const pool = require('../db');

exports.getAllUsers = () => {
    return pool.query("SELECT username,email FROM users");
};