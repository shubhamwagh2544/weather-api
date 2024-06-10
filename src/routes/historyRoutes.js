import express from 'express';
import getHistoricalData from '../controllers/historyController.js';
import authenticateApiKey from '../middlewares/authMiddleware.js';
const historyRouter = express.Router()

historyRouter.get('/locationId', authenticateApiKey, getHistoricalData)

export default historyRouter