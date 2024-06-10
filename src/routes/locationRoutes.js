import express from 'express';
import { addLocation, deleteLocation, getAllLocations, getLocation, updateLocation } from '../controllers/locationController.js';
const locationRouter = express.Router()

locationRouter.get('/', getAllLocations);

locationRouter.post('/', addLocation);

locationRouter.get('/:locationId', getLocation);

locationRouter.put('/:locationId', updateLocation);

locationRouter.delete('/:locationId', deleteLocation);

export default locationRouter