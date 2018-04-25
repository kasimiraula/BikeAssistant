const questionsRouter = require('express').Router()
const questiondata = require('../public/questions')

questionsRouter.get('/', async (request, response) => {
  response.json(questiondata.map(formatQuestion))
})

const formatQuestion = (question) => {
  return {
    question: question.question,
    id: question._id,
    attribute: question.attribute,
    answers: question.answers
  }
}

module.exports = questionsRouter
