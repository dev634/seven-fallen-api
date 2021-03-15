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
    try{
        const form = formidable({ multiples: true });
        let userCreated = null;
        form.parse(req, async (err, fields, files) => {
            if(fields.username !== null && fields.email !== null){
               userCreated =  await pool.query("INSERT INTO users(username,email) VALUES($1,$2) RETURNING username,email",[fields.username,fields.email]); 
               let data = await userCreated((err, req) => {
                    console.log(err)
               }) 
            }
        });
    }catch(err){
        res.status(err.code).json({
            code: res.statusCode,
            message: err.message
        })
    }
        
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
        RETURNING *)
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
                        message: `${result.rows[0].username} succesfully updated ...`
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

const deleteUser = async (req,res) => {
    try {
        const regex = /^[0-9]+$/g;
        const id = req.params.id;
        let exist = null;
        
        if(regex.test(id) && id > 0){
            exist = await pool.query('SELECT username,email FROM users WHERE id = $1',[id]);
            if(exist.rowCount !== 1){
                throw {
                    code: 404,
                    message: "User not found..."
                }
            }

            const deleted = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
            res.status(200).json({
                code: res.statusCode,
                message: `${deleted.rows[0].username} succesfully deleted ...`
            })

        }else{
            throw {
                code: 400,
                message: "Bad request ..."
            }
        }

    }catch(err){
        res.status(err.code).json({
            code: res.statusCode,
            message: err.message
        })
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}