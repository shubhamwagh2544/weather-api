import express from 'express';
import { addLocation, deleteLocation, getAllLocations, getLocation, updateLocation } from '../controllers/locationController';
const router = express.Router()

router.get('/locations', getAllLocations);

router.post('/locations', addLocation);

router.get('/locations/:locationId', getLocation);

router.put('/locations/:locationId', updateLocation);

router.delete('/locations/:locationId', deleteLocation);

export default router