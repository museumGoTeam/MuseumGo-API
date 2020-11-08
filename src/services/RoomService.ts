import { Error } from "mongoose";
import RoomModel, { RoomDocument } from "../models/Room";
import { DocumentResponse, IRoom } from "./type";

class RoomService {
  async getAll(): Promise<DocumentResponse> {
    try {
      const rooms: RoomDocument[] = await RoomModel.find();
      return { success: true, data: rooms };
    } catch (e) {
      const error: Error = e;
      return { success: false, message: error };
    }
  }

  async getOne({
    _id,
  }: {
    _id: string;
  }): Promise<DocumentResponse | null> {
    try {
      const room: RoomDocument | null = await RoomModel.findOne({_id});
      if (!room) return { success: false, message: "La pièce n'éxiste pas" };
      return { success: true, data: room };
    } catch (e) {
      const error: Error = e;
      return { success: false, message: error };
    }
  }

  async InsertOne(roomInsert: IRoom) {
    if (await this.checkIsExist(roomInsert.label)) return;
    try {
      const poi = new RoomModel(roomInsert);
      await poi.save();
    } catch (e) {
      const error: Error = e;
    }
  }

  async checkIsExist(name: string): Promise<boolean> {
    const isPoiExist = await RoomModel.findOne({ name });
    return isPoiExist !== null;
  }
}

export default RoomService;
