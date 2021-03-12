const pool = require('../db');

const Users = function () {
    this.data = null;
} 

Users.prototype.getAllUsers = async function() {
    this.data = await pool.query('SELECT username,email FROM users');
}

module.exports = Users;