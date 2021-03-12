const pool = require('../db');

export const getAllUsers = () => {
    return pool.query("SELECT username,email FROM users");
}

