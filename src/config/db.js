import { config } from 'dotenv';
import { connect } from 'mongoose';
config()

async function connectDatabase() {
    try {
        await connect(process.env.MONGODB_URI)
        console.log('mongodb connected')
    }
    catch (err) {
        console.log('error connecting mongodb', err)
    }
}

export default connectDatabase