
const distance = require('euclidean-distance')

const read_attributes = (answers) => {
  const attributes = []
  answers.forEach(a=> {
    attributes.push(a.attribute)
  })
  return attributes
}

const format_bikes_for_comparison = (bikes, attributes) => {
  const bikes_attributes = {}
  bikes.forEach(bike => {
    bikes_attributes[bike.model] = attributes.map(value => bike.attributes[value])
  })
  return bikes_attributes
}

const format_answers = (answers, attributes) => {
  const answerObject = {}
  answers.forEach(a=> {
    answerObject[a.attribute] = a.answer.value
  })
  return attributes.map(attr => answerObject[attr])
}

const compare_bikes_and_answers = (bikes, answers) => {
  const attributes = read_attributes(answers)
  const formatted_bikes = format_bikes_for_comparison(bikes, attributes)
  const formatted_answers = format_answers(answers, attributes)
  const scores = []
  let s = 0
  for(bike in formatted_bikes) {
    s = Math.pow(distance(formatted_bikes[bike], formatted_answers),2)
    scores.push({"model" : bike, "score" : s})
  }
  return scores.sort((a,b) => a.score - b.score)
}


module.exports = {
  compare_bikes_and_answers
}
