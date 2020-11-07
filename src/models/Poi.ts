import mongoose, {Document as MongooseDocument} from 'mongoose'

export interface PoiDocument extends MongooseDocument {
    name: string,
    description: string
    image: string,
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
    pos: {
        x: Number,
        y: Number
    }
})


export default mongoose.model<PoiDocument>("Poi", Schema)