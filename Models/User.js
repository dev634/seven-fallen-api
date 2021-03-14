const pool = require('../db');
const formidable = require("formidable");

const getUser = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT username, email FROM users WHERE id = $1',[id], (err,result) => {
      try{
          if(err){
              err.code = 422;
              err.message = "unable to process this request";
              throw err;
          }
          if(result.rowCount === 0){
              throw {code: 404, message: "user not found ..."};
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
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if(fields.username !== null && fields.email !== null){
                pool.query(
                    "INSERT INTO Users(username,email) VALUES($1,$2) RETURNING username,email",
                    [fields.username,fields.email],
                    (err, result) => {
                        try{
                            if(err){
                                err.code = 422;
                                err.message = "Bad request ...";
                                throw err;
                            }else{
                                res.status(201).json({
                                    code: res.statusCode,
                                    message : `${result.rows[0].username} a bien etait créé.`
                                })
                            }

                        }catch(err){
                            res.status(err.code).json({
                                code: res.statusCode,
                                message: err.message
                            });
                        }
                    }
                )
                
            }
    });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const dataTab = [];
    for(property in body){
      dataTab.push(`${property} = \'${body[property]}\'`);
    }
    const settingString = dataTab.join();
    pool.query(
        `WITH updated AS
        (UPDATE users 
        SET ${settingString} 
        WHERE id = $1 
        RETURNING ${settingString})
        SELECT updated.* 
        FROM updated`,
        [id],
        (err,result) => {
            try {
                if(err){
                    err.code = 404;
                    err.message = "User not found";
                    throw err;
                }else{        
                    res.status(200).json({
                        code: res.statusCode,
                        message: `${result.rows}`
                    });
                }
            }catch(err){
                res.status(err.code).json({
                    code: res.statusCode,
                    message: err.message
                })
            }
        }
    )
}

module.exports = {
    getUser,
    createUser,
    updateUser
}