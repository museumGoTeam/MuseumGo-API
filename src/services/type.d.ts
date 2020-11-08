import { Error } from "mongoose";
import { PoiDocument } from "../models/Poi";
import { RoomDocument } from "../models/Room";

export interface DocumentResponse {
    message?: Error | string,
    data?:  RoomDocument[] | RoomDocument | PoiDocument[] | PoiDocument | IMap | null,
    success: boolean
}

export interface IMap {
    map: number[][],
    pois: IPOI[],
    rooms: IRoom[]
}

export interface IPOI {
    name: string
    description?: string
    image?: string
    pos: Pos
}

export interface IRoom {
    label: string
    pos: Pos
}