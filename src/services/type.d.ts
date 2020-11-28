import { Error } from "mongoose";
import { PoiDocument } from "../models/Poi";
import { RoomDocument } from "../models/Room";
export interface DocumentResponse {
    message?: Error | string,
    data?:  RoomDocument[] | RoomDocument | PoiDocument[] | PoiDocument | IMap | null,
    success: boolean
}

export interface DataResponse<T> {
    message?: Error | string,
    data?:  T
    success: boolean
}

export interface IMap {
    map: number[][],
    pois: IPOI[],
    rooms: IRoom[]
}

export interface MongoDocument {
    _id: string
}

export interface Pos {
    x: number,
    y: number
}
export interface IPOI extends MongoDocument {
    name: string
    description?: string
    image?: string
    isConfigured: boolean
    pos: Pos
}

export interface IRoom extends MongoDocument {
    label: string
    pos: Pos
}