import { Error } from "mongoose";
import { RoomDocument } from "../models/Room";

export interface DocumentResponse {
    message?: Error | string,
    data?:  RoomDocument[] | RoomDocument | null,
    success: boolean
}