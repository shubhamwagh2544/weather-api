import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import connectDatabase from './config/db.js'
import errorHandler from './middlewares/errorHandlerMiddleware.js'
import historyRouter from './routes/historyRoutes.js'
import locationRouter from './routes/locationRoutes.js'
import weatherRouter from './routes/weatherRoutes.js'
config()
const app = express()

// connect to MongoDB
connectDatabase()

// middlewares
app.use(express.json())
app.use(cors())

// logging middleware
app.use(morgan(':method :url :status - :response-time ms'))

// rate limiting middleware
const rateLimiter = rateLimit({
    windowMs: 5000,             // 5 sec window
    limit: 5,                   // 5 requests max
    standardHeaders: 'draft-7',
    legacyHeaders: false
})
app.use(rateLimiter)

// routes
app.use('/locations', locationRouter)
app.use('/weather', weatherRouter)
app.use('/history', historyRouter)

// all routes handler
app.all('*', (req, res) => {
    res.status(404).json({
        mess: 'this might not be route you are looking for'
    })
})

// error handler middleware
app.use(errorHandler)

// server listens
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server started on port ${port}`))