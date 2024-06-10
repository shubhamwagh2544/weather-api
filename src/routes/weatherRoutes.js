import express from 'express'
import getWeatherData from '../controllers/weatherController.js'
import authenticateApiKey from '../middlewares/authMiddleware.js'
const weatherRouter = express.Router()

weatherRouter.get('/:locationId', authenticateApiKey, getWeatherData)

export default weatherRouter