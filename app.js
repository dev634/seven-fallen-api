const express = require('express')
const cors = require('cors') 
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())


//Create User 
app.post('/user',async (req,res) => {
    try{
        console.log(req.body)
    }catch(err){
        console.log(err.message)
    }
})

//GET user
app.get('/api/user', () => {

})

app.listen(port , () => {
    console.log(`Listen on port ${port}`)
})

