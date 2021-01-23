const express = require('express')
const cors = require('cors') 
const app = express()

const port = 3000

app.use(cors)
/*app.use(express.json)*/

app.post('/api',async (req,res) => {
    try {
        console.log(req.body)
        res.send('Hey it\'s me')
    }catch(err) {
        console.log(err.message)
    }
})

app.listen(port , () => {
    console.log(`Listen on port ${port}`)
})

