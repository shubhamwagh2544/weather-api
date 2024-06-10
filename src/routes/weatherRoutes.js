import express from 'express'
import getWeatherData from '../controllers/weatherController'
import authenticateApiKey from '../middlewares/authMiddleware'
const router = express.router()

router.get('/weather/:locationId', authenticateApiKey, getWeatherData)

export default router