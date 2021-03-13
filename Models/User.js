const pool = require('../db');

const getUser = (req, res) => {
    try{
      const id = req.params.id;
      const getUser = pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
            if(err){
                err.code = 404;
                err.message = 'User not found...';
                throw err;
            }

            return result.rows[0];
      });
    }catch(err){
      res.status(404).json({
        status : err.statusCode,
        message: err.message
      });
    }
}

module.exports = {
    getUser
}