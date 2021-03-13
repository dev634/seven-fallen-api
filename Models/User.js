const pool = require('../db');
const formidable = require("formidable");

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

const createUser = (req, res) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
          if(err){
            res.json(err.message)
          }
          pool.query(
            "INSERT INTO Users(username,email) VALUES($1,$2) RETURNING username,email",
            [fields.username,fields.email],
            (err, result) => {
                if(err){
                    err.code = 422,
                    err.message = 'Bad request ...'
                }else{
                    res.status(201).json({
                        status: res.statusCode,
                        message : `${result.rows[0].username} a bien etait créé.`
                    })
                }
            }
          )
        });
    } catch (err) {
        res.status(err.code).json({
            code : err.code,
            message: err.message
        })
    }
}

module.exports = {
    getUser,
    createUser
}