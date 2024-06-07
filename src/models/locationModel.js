import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
})

const Location = model('Location', LocationSchema)

export default Location