import axios from 'axios'
import dotenv from 'dotenv'
import { WEATHER_BASE_URI } from '../config/urlconfig.js'
import { checkIfLocationExists } from './locationController.js'
import { get, set } from '../cache/store.js'
dotenv.config()

export default async function getWeatherData(req, res, next) {
    try {
        const locationId = req.params.locationId
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }

        // get cached data
        const cachedData = get(locationId)
        if (cachedData !== null) {
            console.log('cache hit')
            return res.status(200).json(cachedData)
        }

        const location = await checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        // fetch weather data
        const latitude = location.latitude
        const longitude = location.longitude
        const apikey = process.env.WEATHER_API_KEY

        if (!apikey) {
            return res.status(403).json({
                message: 'unathorized'
            })
        }

        const response = await axios.get(`${WEATHER_BASE_URI}/current.json?key=${apikey}&q=${latitude},${longitude} &aqi=yes`)

        if (!response) {
            return res.status(400).json({
                message: 'no response from weather api'
            })
        }

        // set cache data
        set(locationId, response.data)

        return res.status(200).json(response.data)
    }
    catch (err) {
        console.log('error fetching weather')
        next(err)
    }
}