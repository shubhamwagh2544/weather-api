import express from 'express';
import getHistoricalData from '../controllers/historyController';
import authenticateApiKey from '../middlewares/authMiddleware';
const router = express.Router()

router.get('/history/locationId', authenticateApiKey, getHistoricalData)

export default router