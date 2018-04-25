const bikedata = require('../public/bikes')
const bikesRouter = require('express').Router()

bikesRouter.get('/', (request, response) => {
  response.json(bikedata.map(formatBike))
})

const formatBike = (bike) => {
  return {
    Bike: bike.model,
    id: bike._id,
    attributes: bike.attributes,
    link: bike.link,
    photo: bike.photo
  }
}

module.exports = bikesRouter
