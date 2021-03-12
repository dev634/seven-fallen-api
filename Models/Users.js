const pool = require('../db');

const getAllUsers = () => {
    const users = pool.query('SELECT username,email FROM users');
    return users;
}



module.exports = {
    getAllusers
};