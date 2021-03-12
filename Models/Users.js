const pool = require('../db');

function getAllUsers(){
    return pool.query("SELECT username,email FROM users");
}

export { getAllUsers };

