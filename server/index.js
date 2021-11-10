const express = require('express')
require('./db/pg')
const cityRouter = require('./routers/crud')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api', cityRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
  })