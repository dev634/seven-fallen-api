const pool = require('../db');

export function getAllUsers(){
    return pool.query("SELECT username,email FROM users");
}

