const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

const bikesRouter = require('./controllers/bikes')
const questionRouter = require('./controllers/questions')
const resultsRouter = require('./controllers/results')
const PORT = config.port

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
mongoose.Promise = global.Promise

app.use('/api/bikes', bikesRouter)
app.use('/api/questions', questionRouter)
app.use('/api/results', resultsRouter)
app.use(middleware.error)

app.get('/', (request, response) => {
  response.send('<h1>Hello World (or you)!</h1>')
})


//const server = http.createServer(app)
/*
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*server.on('close', () => {
  mongoose.connection.close()
})*/

module.exports = {
  app
}
