import { Error } from 'mongoose'
import PoiModel, { PoiDocument } from '../models/Poi';
import FileUtil from '../utils/FileUtil';
import { DocumentResponse, IPOI } from './type';


class PoiService {

    async insertOne(poiInsert: IPOI): Promise<PoiDocument | void> {
        if (await this.checkIfNameExist(poiInsert.name)) return
        try {
            const poi = new PoiModel(poiInsert)
            return await poi.save()
        } catch(e) {
            const error: Error = e
        }
    }

    async updateOne(poiUpdate: IPOI): Promise<DocumentResponse> {
        if (await !this.checkIsExist(poiUpdate._id)) return {success: false, message: "The point of interest cannot be updated"}
        if (poiUpdate.description === null ||poiUpdate.image === null) return {success: false, message: "Please fill the required fields"}
        try {
            const poi = await PoiModel.updateOne({_id: poiUpdate._id}, {...poiUpdate, isConfigured: true})
            return {success: true, message: "The point of interest was successfully updated !", data: poi}
        } catch(e) {
            return {success: false, message: "An intern error has occured"}
        }
    }

    async getAll({onlyConfigured}: {onlyConfigured: boolean}): Promise<DocumentResponse> {
        try {
            const pois: PoiDocument[] = await PoiModel.find({isConfigured: onlyConfigured});
            return {success: true, data: pois}
        } catch(e) {
            const error: Error = e
            return {success: false, message: "An intern error has occured"}
        }
    }

    async getOne(_id: string): Promise<DocumentResponse> {
        try {
            const poi: PoiDocument | null = await PoiModel.findOne({_id})
            if (!poi) return {success: false, message: "The point of interest doesn't exist"}
            return {success: true, data: poi}
        } catch(e) {
            const error: Error = e
            return {success: false, message: "An intern error has occured"}
        }
    }

    async deleteOne(_id: string): Promise<DocumentResponse> {
        try {
            const poi: PoiDocument | null = await PoiModel.findByIdAndDelete(_id)
            if (!poi) return { success: false, message: "The point of interest doesn't exist"}
            await FileUtil.deleteCell({posX: poi.pos.x, posY: poi.pos.y})
            return {success: true, message: "The point of interest has been deleted", data: poi}
        } catch(e) {
            return {success: false, message: "An intern error has occured"}
        }
    }


    async checkIfNameExist(name: string): Promise<boolean> {
        const isRoomExist = await PoiModel.findOne({name})
        return isRoomExist !== null;
      }

    async checkIsExist(_id: string): Promise<boolean> {
        const isPoiExist = await PoiModel.findOne({_id})
        return isPoiExist !== null
    }
}

export default PoiService