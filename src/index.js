import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
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

app.use('/locations', locationRouter)
app.use('/weather', weatherRouter)
app.use('/history', historyRouter)

app.all('*', (req, res) => {
    res.status(404).json({
        mess: 'this might not page you are looking for'
    })
})

// error handler middleware
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server started on port ${port}`))