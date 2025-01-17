import { Error } from "mongoose";
import Room from "../models/Room";
import RoomModel, { RoomDocument } from "../models/Room";
import FileUtil from "../utils/FileUtil";
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

  async updateOne(roomUpdate: IRoom): Promise<DocumentResponse> {
    if (await !this.checkIsExist(roomUpdate._id)) return {success: false, message: "The room doesn't exist"}
    try {
      const room = await RoomModel.updateOne({_id: roomUpdate._id}, roomUpdate)
      return {success: true, message: "The room was successfully updated !", data: room}
    } catch (e) {
      return {success: false, message: "An intern error has occured"}
    }
  }

  async getOne({
    _id,
  }: {
    _id: string;
  }): Promise<DocumentResponse | null> {
    try {
      const room: RoomDocument | null = await RoomModel.findOne({_id});
      if (!room) return { success: false, message: "The room doesn't exist" };
      return { success: true, message:`You are in room ${room.label}`, data: room };
    } catch (e) {
      const error: Error = e;
      return { success: false, message: error };
    }
  }

  async InsertOne(roomInsert: IRoom): Promise<RoomDocument | void> {
    if (await this.checkIfNameExist(roomInsert.label)) return;
    try {
      const poi = new RoomModel(roomInsert);
      return await poi.save();
    } catch (e) {
      const error: Error = e;
    }
  }

  async deleteOne(_id: string): Promise<DocumentResponse> {
    try {
        const room: RoomDocument | null = await RoomModel.findByIdAndDelete(_id)
        if (!room) return { success: false, message: "The room doesn't exist"}
        await FileUtil.deleteCell({posX: room.pos.x, posY: room.pos.y})
        return {success: true, message: "The room has been deleted", data: room}
    } catch(e) {
        return {success: false, message: "An intern error has occured"}
    }
}

  async checkIfNameExist(name: string): Promise<boolean> {
    const isRoomExist = await RoomModel.findOne({label: name})
    return isRoomExist !== null;
  }

  async checkIsExist(_id: string): Promise<boolean> {
    const isRoomExist = await RoomModel.findOne({ _id });
    return isRoomExist !== null;
  }
}

export default RoomService;
