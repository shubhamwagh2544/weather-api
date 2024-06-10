import express from 'express'
import Location from '../models/locationModel'
import axios from 'axios'
import { WEATHER_BASE_URI } from '../config/urlconfig'
const router = express.router()

router.get('/weather/:locationId', async (req, res, next) => {
    try {
        const locationId = req.params.locationId
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }
        const location = await Location.findOne({
            _id: locationId
        })
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        // fetch weather data
        const latitude = location.latitude
        const longitude = location.longitude

        const response = await axios.get(`${WEATHER_BASE_URI}?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude} &aqi=yes`)

        return res.status(200).json(response)
    }
    catch (err) {
        console.log('error fetching weather')
        next(err)
    }
})

export default router