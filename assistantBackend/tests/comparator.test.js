const distance = require('euclidean-distance')
const comparator = require('../utils/comparator')

const answers = [
  { attribute: 'tire clearance',
    answer: { content: 'As wide as possible', value: 100 } },
  { attribute: 'has many gears',
    answer:
    { content: 'No, a single speed bike is what I\'m after.',
       value: 70 } },
  { attribute: 'weight',
    answer:
     { content: 'My current bike weighs a ton. Anything lighter than that would be nice.',
       value: 100 } }
]

const bikes = [{
  "model" : "Brooklyn",
  "attributes" : {
    "tire clearance" : 100,
    "fenders" : 100,
    "has many gears": 70,
    "breaking power" : 25,
    "weight" : 100,
    "aerodynamicity" : 15,
    "riding speed" : 15,
    "has lights by standard" : 0,
    "has a step-through frame" : 100,
    "is of low maintenance" : 70
  }},
  {
  "model" : "Bike2",
  "attributes" : {
    "tire clearance" : 100,
    "fenders" : 100,
    "has many gears": 70,
    "breaking power" : 25,
    "weight" : 100,
    "aerodynamicity" : 15,
    "riding speed" : 15,
    "has lights by standard" : 0,
    "has a step-through frame" : 0,
    "is of low maintenance" : 70
  }},
  {
    "model" : "Bike3",
    "attributes" : {
      "tire clearance" : 10,
      "fenders" : 0,
      "has many gears": 73,
      "breaking power" : 75,
      "weight" : 12,
      "aerodynamicity" : 45,
      "riding speed" : 15,
      "has lights by standard" : 0,
      "has a step-through frame" : 100,
      "is of low maintenance" : 70
    }}
]

const attributes = ["tire clearance","fenders","has many gears",
"breaking power","weight","aerodynamicity","riding speed","has lights by standard",
"has a step-through frame","is of low maintenance"]


test('distance calculation works with simple input', () => {
  const d1 = [1,1]
  const d2 = [0,0]

  const result = distance(d1,d2)
  expect(result).toBe(Math.sqrt(2))
})


/*test('attributes can be read from answers', () => {
  const ans2 =  [
    { attribute: 'tire clearance',
      answer: { content: 'As wide as possible', value: 100 } },
    { attribute: 'has many gears',
      answer:
      { content: 'No, a single speed bike is what I\'m after.',
         value: 1 } },
    { attribute: 'weight',
      answer:
       { content: 'My current bike weighs a ton. Anything lighter than that would be nice.',
         value: 50 } }
  ]
  const formatted_ans = {}
  ans2.forEach(a=> {
    formatted_ans[a.attribute] = a.answer.value
  })

  expect(formatted_ans[ans2[2].attribute]).toBe(50)
})*/

test('distance calculation works with more complexity', () => {
  const d1 = [1,1,1,1,1]
  const d2 = [0,0,0,0,0]

  const result = distance(d1,d2)
  expect(result).toBe(Math.sqrt(5))
})

/*test('distance calcultion works between bike and answers', () => {

  const bike1 = bikes[0]

  const b1 = attributes.map(v => bike1.attributes[v])
  const a = attributes.map(v => answers[v])

  const d = distance(b1,a)
  expect(d).toBe(0)
})*/

test('distance calculation works between many bikes and answers', () => {
  const results = comparator.compare_bikes_and_answers(bikes, answers)
  expect(results[0].model).toBe("Brooklyn")
})
