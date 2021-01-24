const express = require('express')
const cors = require('cors') 
const app = express()
const port = 3000
const pool = require('./db')

app.use(cors())
app.use(express.json())


//Create User 
app.post('/user',async (req,res) => {
    try{
        console.log(req.body.firstname)
        console.log(req.body.lastname)
        console.log(req.body.email)
    }catch(err){
        console.log(err.message)
    }
})


app.listen(port , () => {
    console.log(`Listen on port ${port}`)
})

