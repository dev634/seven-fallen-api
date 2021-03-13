const pool = require('../db');

const getUser = (req, res) => {

      const id = req.params.id;
      pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
        try{
            if(err){
                throw new Error('User not found...');
            }else{
                res.json(result.rows[0])
            }
        }catch(err){
            res.status(404).json({
              status : err.statusCode,
              message: err.message
            });
          }
      });
}

module.exports = {
    getUser
}