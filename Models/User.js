const pool = require('../db');

const getUser = (req, res) => {

      const id = req.params.id;
      pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
        try{
            if(err){
                throw new Error('User not found...');
            }

            if(result.rowCount === 0){
                throw new Error('User not found...');
            }
        }catch(err){
            res.status(404).json({
              code : res.statusCode,
              message: err.message
            });
          }
      });
}

module.exports = {
    getUser
}