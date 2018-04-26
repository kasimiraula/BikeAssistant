const questionsRouter = require('express').Router()
const questiondata_en = require('../public/questionsEN')
const questiondata_fi = require('../public/questionsFI')

questionsRouter.get('/en', async (request, response) => {
  response.json(questiondata_en.map(formatQuestion))
})

questionsRouter.get('/fi', async (request, response) => {
  response.json(questiondata_fi.map(formatQuestion))
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
