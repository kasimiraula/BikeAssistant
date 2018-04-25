const mongoose = require('mongoose')

const Answer = mongoose.model('Answer', {
  answers: Array
})
module.exports = Answer
