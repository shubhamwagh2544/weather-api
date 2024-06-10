import Location from "../models/locationModel.js"

export async function checkIfLocationExists(locationId) {
    const location = await Location.findOne({
        _id: locationId
    })
    return location
}

async function getAllLocations(req, res, next) {
    try {
        const locations = await Location.find()
        if (locations.length === 0) {
            return res.status(200).json({
                message: 'no locations found'
            })
        }
        return res.status(200).json(locations)
    }
    catch (err) {
        console.log('error getting all locations')
        next(err)
    }
}

async function addLocation(req, res, next) {
    try {
        const { name, latitude, longitude } = req.body
        if (!name || !latitude || !longitude) {
            return res.status(400).json({
                message: 'invalid payload data'
            })
        }
        const locationExists = await Location.findOne({
            name,
            latitude,
            longitude
        })
        if (locationExists) {
            return res.status(409).json({
                message: 'location already exists'
            })
        }
        const location = await Location.create({
            name,
            latitude,
            longitude
        })
        return res.status(201).json(location)
    }
    catch (err) {
        console.log('error creating location')
        next(err)
    }
}

async function getLocation(req, res, next) {
    try {
        const locationId = req.params.locationId
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }
        const location = await checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        return res.status(200).json(location)
    }
    catch (err) {
        console.log('error fetching location')
        next(err)
    }
}

async function updateLocation(req, res, next) {
    try {
        const locationId = req.params.locationId
        const { name, latitude, longitude } = req.body
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }
        const location = await checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        const updatedLocation = await Location.updateOne({
            _id: locationId
        }, {
            name,
            latitude,
            longitude
        })
        return res.status(200).json(updatedLocation)
    }
    catch (err) {
        console.log('error updating location')
        next(err)
    }
}

async function deleteLocation(req, res, next) {
    try {
        const locationId = req.params.locationId
        if (!locationId) {
            return res.status(400).json({
                message: 'invalid location'
            })
        }
        const location = await checkIfLocationExists(locationId)
        if (!location) {
            return res.status(404).json({
                message: 'location not found'
            })
        }
        await Location.deleteOne({
            _id: locationId
        })
        return res.status(200).json({
            message: 'location deleted'
        })
    }
    catch (err) {
        console.log('error deleting location')
        next(err)
    }
}

export {
    addLocation, deleteLocation, getAllLocations, getLocation,
    updateLocation
}
