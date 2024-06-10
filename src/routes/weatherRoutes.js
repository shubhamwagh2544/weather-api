import express from 'express'
import getWeatherData from '../controllers/weatherController.js'
const weatherRouter = express.Router()

weatherRouter.get('/:locationId', getWeatherData)

export default weatherRouter