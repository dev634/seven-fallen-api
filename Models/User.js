const pool = require('../db');

const getUser = async(req, res) => {
    try{
      const id = req.params.id;
      const getUser = await pool.query('SELECT username, email FROM users WHERE id = $1',[id]).catch((err)=> {
        if(err){
          err.code = res.statusCode;
          err.message = 'User not found ...';
        }
        throw err;
      });
      if(getUser.rowCount === 0){
        throw new Error('This user doesn\'t exist');
      }
      res.json(getUser.rows);
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