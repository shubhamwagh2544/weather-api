import express from 'express';
import getHistoricalData from '../controllers/historyController.js';
const historyRouter = express.Router()

historyRouter.get('/:locationId', getHistoricalData)

export default historyRouter