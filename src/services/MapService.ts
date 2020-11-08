import { FZ_FILENAME } from "../constants";
import FileUtil from "../utils/FileUtil";
import PoiService from "./PoiService";
import RoomService from "./RoomService";
import { DocumentResponse, IMap, IPOI, IRoom } from "./type";

export default class MapService {
    _roomContext: RoomService;
    _poiContext: PoiService;
    constructor() {
        this._roomContext = new RoomService()
        this._poiContext = new PoiService()
    }

    async GetMap(): Promise<DocumentResponse> {
        try {
            const map = await FileUtil.fileToCells(FZ_FILENAME)
            const pois = (await this._poiContext.getAll()).data as IPOI[]
            const rooms = (await this._roomContext.getAll()).data as IRoom[]
            return {success: true, data: {map, pois, rooms}}
        } catch {
            return {success: false, message: "An intern error has occured"}
        }
    }

    async updateMap({map, pois, rooms}: IMap): Promise<DocumentResponse> {
        try {
            pois.forEach(async poi => await this._poiContext.insertOne(poi))
            rooms.forEach(async room => await this._roomContext.InsertOne(room))
            FileUtil.cellsToFile(FZ_FILENAME, map)
            return {success: true, message: "The map was successfully updated !"}
        } catch(e) {
            console.log(e)
            return {success: false, message: "An intern error has occured"}
        }
    }
}


