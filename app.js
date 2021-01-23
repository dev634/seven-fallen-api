const express = require('express')
const app = express()

const port = 3000

app.use(express.json)

app.get('/api',(req,res) => {
    res.send('hello')
})

app.listen(port , () => {
    console.log(`Listen on port ${port}`)
})

