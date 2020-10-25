import mongoose, {Document as MongooseDocument} from 'mongoose'

export interface RoomDocument extends MongooseDocument {
    label: string,
    pos: {
        x: number,
        y: number
    }
}

const Schema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    pos: {
        x: Number,
        y: Number
    }
})


export default mongoose.model<RoomDocument>("Room", Schema)