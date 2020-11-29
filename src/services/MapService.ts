import { FZ_FILENAME } from "../constants";
import { PoiDocument } from "../models/Poi";
import { RoomDocument } from "../models/Room";
import Dijkstra from "../utils/Dijkstra";
import FileUtil from "../utils/FileUtil";
import NodeUtil from "../utils/NodeUtil";
import PoiService from "./PoiService";
import RoomService from "./RoomService";
import { DataResponse, DocumentResponse, IMap, IPOI, IRoom, ItineraryPos } from "./type";


const dijkstra: Dijkstra = new Dijkstra(FZ_FILENAME)
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
            const pois = (await this._poiContext.getAll({onlyConfigured: false})).data as IPOI[]
            const rooms = (await this._roomContext.getAll()).data as IRoom[]
            return {success: true, data: {map, pois, rooms}}
        } catch {
            return {success: false, message: "An intern error has occured"}
        }
    }

    async GetItinerary(itineraryPos: ItineraryPos): Promise<number[][] | undefined> {
        await dijkstra.init(itineraryPos)
        const itinerary = dijkstra.generate()
        const cells = NodeUtil.nodesToCells(dijkstra.nodes, itinerary)
        return cells
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


