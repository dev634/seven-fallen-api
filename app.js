const express = require('express')
const app = express()

const port = 3000

app.use(express.json)

app.get('/api',async (req,res) => {
    try {
        console.log(req.body)
    }catch(err) {
        console.log(err.message)
    }
})

app.listen(port , () => {
    console.log(`Listen on port ${port}`)
})

