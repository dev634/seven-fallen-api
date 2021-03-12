const pool = require('../db');

const Users = function () {
    this.data = null;
} 

Users.prototype.getAllUsers = function() {
    this.data = pool.query('SELECT username,email FROM users');
}

module.exports = Users;