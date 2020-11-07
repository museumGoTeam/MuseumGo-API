import { Error } from 'mongoose'
import RoomModel, {RoomDocument} from '../models/Room'
import { DocumentResponse } from './type';


class RoomService {

    async getAll(): Promise<DocumentResponse> {
        try {
            const rooms: RoomDocument[] = await RoomModel.find();
            return {success: true, data: rooms}
        } catch(e) {
            const error: Error = e
            return {success: false, message: error }
        }
    }

    async getOne({posStr}: {posStr: string}): Promise<DocumentResponse | null> {
        const [x, y] = posStr.split('-').map(posItem => parseInt(posItem))
        try {
            const room: RoomDocument | null = await RoomModel.findOne({pos: {x,y}})
            if (!room) return {success: false, message: "La pièce n'éxiste pas"}
            return {success: true, data: room}
        } catch(e) {
            const error: Error = e
            return {success: false, message: error}
        }
    }
}

export default RoomService