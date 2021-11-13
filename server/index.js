const express = require('express')
const path = require('path')
require('./db/pg')
const cityRouter = require('./routers/crud')

const app = express()
const port = process.env.PORT

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use('/api', cityRouter)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
  })