import Room, {RoomDocument} from '../models/Room'
import Service from './Service'


class RoomService extends Service<RoomDocument> {
    constructor() {
        super(Room)
    }

    public async getOne(_id: string) {
        let document: RoomDocument | null = null
        try {
            document = await this.context.findOne({_id})
        } catch (e) {
            console.log("error:", e)
        }
        return document
    }
}

export default RoomService