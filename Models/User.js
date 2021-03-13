const pool = require('../db');

const getUser = (req, res) => {
        const id = req.params.id;
        pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
          try{
              if(err && result.rowCount === 0){
                console.log(err)
              }
            //   if(err){
            //       err.code = 422;
            //       err.message = "unable to process this request"
            //       throw err;
            //   }
  
            //   if(result.rowCount === 0){
            //       throw {code: 404, message: 'not found ..'}
            //   }
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