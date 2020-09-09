
const distance = require('euclidean-distance')

const read_attributes = (answers) =>
  answers.map(a => a.attribute)

const format_bikes_for_comparison = (bikes, attributes) =>
  bikes.reduce((initial, bike) => ({
    ...initial,
    [bike.model]:attributes.map(value => bike.attributes[value])
  }), {})

const format_answers = (answers, attributes) => {
  const answerObject = {}
  answers.map(a=> {
    answerObject[a.attribute] = a.answer.value
  })
  return attributes.map(attr => answerObject[attr])
}

const compare_bikes_and_answers = (bikes, answers) => {
  const attributes = read_attributes(answers)
  const formatted_bikes = format_bikes_for_comparison(bikes, attributes)
  const formatted_answers = format_answers(answers, attributes)
  const all_scores = []
  let score = 0
  
  for(bike in formatted_bikes) {
    score = Math.pow(distance(formatted_bikes[bike], formatted_answers),2)
    all_scores.push({"model" : bike, "score" : score})
  }
  return all_scores.sort((a,b) => a.score - b.score)
}


module.exports = {
  compare_bikes_and_answers
}
