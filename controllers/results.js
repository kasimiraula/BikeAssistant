const bikedata = require('../public/bikes')
const resultsRouter = require('express').Router()
const Answer = require('../models/answer')
const comparator = require('../utils/comparator')

resultsRouter.post('/', async (request, response) => {
  let answers = request.body

  try {
    const newAns = new Answer()
    newAns.answers.push(answers.map(formatAnswer))
    await newAns.save()
  } catch (exception) {
    console.log(exception.name)
  }

  answers = answers.filter(ans => ans !== null)
  const bikes = bikedata.map(formatBike)
  const ranked_bikes = comparator.compare_bikes_and_answers(bikes, answers)
  response.status(201).json(ranked_bikes.map(b => formatResult(b, bikes)))
})

const validate_params = (answers) => {
  answers.forEach(a => {
    // check that attribute contains no special chars and is string
    // check that answer.content contains no special chars and is string
    // check that answer.content contains no special chars and is number
  })
}

const formatResult = (bike, all_bikes) => {
  const original = all_bikes.filter(b=> b.model === bike.model)[0]
  const regul_score = Math.round((100000-bike.score)/1000)
  return {
    model: bike.model,
    score: regul_score,
    link: original.link,
    photo: original.photo
  }
}

const formatBike = (bike) => {
  return {
    model: bike.model,
    attributes: bike.attributes,
    photo: bike.photo,
    link: bike.link
  }
}

const formatAnswer = (ans) => {
  if(ans === null) {
    return null
  } else {
    return {
      attribute: ans.attribute,
      preferation: ans.answer.content,
      value: ans.answer.value
    }
  }
}

module.exports = resultsRouter
