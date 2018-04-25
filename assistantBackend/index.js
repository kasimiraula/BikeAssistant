const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const middleware = require('./utils/middleware')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

mongoose.connect(config.mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const bikesRouter = require('./controllers/bikes')
app.use('/api/bikes', bikesRouter)

const questionRouter = require('./controllers/questions')
app.use('/api/questions', questionRouter)

const resultsRouter = require('./controllers/results')
app.use('/api/results', resultsRouter)


app.use(middleware.error)

const PORT = config.port

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
