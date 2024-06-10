import dotenv from 'dotenv'
dotenv.config()

export default function authenticateApiKey(req, res, next) {
    try {
        const apikey = req.query.key
        if (!apikey) {
            return res.status(403).json({
                message: 'unathorized'
            })
        }
        if (apikey !== process.env.WEATHER_API_KEY) {
            return res.status(403).json({
                message: 'invalid api key'
            })
        }
        next()
    }
    catch (err) {
        console.log('error validating api key')
        next(err)
    }
}