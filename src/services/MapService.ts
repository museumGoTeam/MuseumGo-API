import { FZ_FILENAME } from "../constants";
import { PoiDocument } from "../models/Poi";
import { RoomDocument } from "../models/Room";
import FileUtil from "../utils/FileUtil";
import PoiService from "./PoiService";
import RoomService from "./RoomService";
import { DataResponse, DocumentResponse, IMap, IPOI, IRoom } from "./type";

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

    async updateMap({map, pois, rooms}: IMap): Promise<DataResponse<{pois: (void | PoiDocument)[], rooms: (void | RoomDocument)[]}>> {
        try {
            const poisInserted = await (await Promise.all(pois.map(async poi => await this._poiContext.insertOne(poi))))
                .filter(poiInserted => poiInserted !== undefined)
            const roomsInserted = await (await Promise.all(rooms.map(async room => await this._roomContext.InsertOne(room))))
                .filter(roomInserted => roomInserted !== undefined)
            FileUtil.cellsToFile(FZ_FILENAME, map)
            return {success: true, message: "The map was successfully updated !", data: {pois: poisInserted, rooms: roomsInserted}}
        } catch(e) {
            return {success: false, message: "An intern error has occured"}
        }
    }
}


