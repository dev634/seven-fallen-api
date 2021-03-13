const pool = require('../db');

const getUser = (req, res) => {
        const id = req.params.id;
        pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
          try{
              if(err){
                  err.code = 422;
                  err.message = 'unable to process this request';
                  throw err;
              }
              if(result.rowCount === 0){
                  throw {code: 404, message: 'user not found ..'};
              }

              res.status(200).json(result.rows[0]);
          }catch(err){
              res.status(err.code).json({
                code : res.statusCode,
                message: err.message
              });
            }
        });
}

module.exports = {
    getUser
}