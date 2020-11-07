import { Error } from "mongoose";
import { PoiDocument } from "../models/Poi";
import { RoomDocument } from "../models/Room";

export interface DocumentResponse {
    message?: Error | string,
    data?:  RoomDocument[] | RoomDocument | PoiDocument[] | PoiDocument | null,
    success: boolean
}

export interface IPOI {
    name: string
    description?: string
    image?: string
    pos: Pos
}

export interface IRoom {
    qrcode: string
    pos: Pos
}