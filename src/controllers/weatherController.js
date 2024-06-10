import axios from 'axios'
import dotenv from 'dotenv'
import { WEATHER_BASE_URI } from '../config/urlconfig.js'
import { checkIfLocationExists } from './locationController.js'
dotenv.config()

export default async function getWeatherData(req, res, next) {
    try {
        const locationId = req.params.locationId
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }
        const location = checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        // fetch weather data
        const latitude = location.latitude
        const longitude = location.longitude

        const response = await axios.get(`${WEATHER_BASE_URI}/current.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude} &aqi=yes`)

        if (!response) {
            return res.status(400).json({
                message: 'no response from weather api'
            })
        }
        return res.status(200).json(response)
    }
    catch (err) {
        console.log('error fetching weather')
        next(err)
    }
}