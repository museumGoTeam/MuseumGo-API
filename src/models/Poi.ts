import mongoose, {Document as MongooseDocument} from 'mongoose'

export interface PoiDocument extends MongooseDocument {
    name: string,
    description: string
    image: string,
    isConfigured: boolean
    pos: {
        x: number,
        y: number
    }
}

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    isConfigured: {
        type: Boolean,
        required: true,
        default: false
    },
    pos: {
        x: Number,
        y: Number
    }
})


export default mongoose.model<PoiDocument>("Poi", Schema)