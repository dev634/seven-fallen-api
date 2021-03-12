const pool = require('../db');

const getAllUsers = () => {
    return pool.query("SELECT username,email FROM users");
}

export {getAllUsers};