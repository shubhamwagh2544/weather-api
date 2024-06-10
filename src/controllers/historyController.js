import axios from "axios"
import dotenv from 'dotenv'
import { WEATHER_BASE_URI } from "../config/urlconfig.js"
import { checkIfLocationExists } from "./locationController.js"
dotenv.config()

function getDateBasedOnDays(days) {
    const date = new Date()
    date.setDate(date.getDate() - days)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, 0)
    const day = String(date.getDate()).padStart(2, 0)

    return `${year}-${month}-${day}`;
}

export default async function getHistoricalData(req, res, next) {
    // we need location to get historical data of specific location
    try {
        const locationId = req.params.locationId
        const days = req.query.dt

        if (!locationId || !days) {
            return res.status(400).json({
                message: 'invalid input query data'
            })
        }
        const location = checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }

        // fetch historical data
        const date = getDateBasedOnDays(days)
        const latitude = location.latitude
        const longitude = location.longitude

        const response = await axios.get(`${WEATHER_BASE_URI}/history.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&dt=${date}`)

        if (!response) {
            return res.status(400).json({
                message: 'no response from history api'
            })
        }
        return res.status(200).json(response)
    }
    catch (err) {
        console.log('error getting historical data')
        next(err)
    }
}