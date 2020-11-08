import { Error } from 'mongoose'
import PoiModel, { PoiDocument } from '../models/Poi';
import { DocumentResponse, IPOI } from './type';


class PoiService {

    async insertOne(poiInsert: IPOI): Promise<void> {
        if (await this.checkIsExist(poiInsert.name)) return
        try {
            const poi = new PoiModel(poiInsert)
            await poi.save()
        } catch(e) {
            const error: Error = e
        }
    }

    async updateOne(poiUpdate: IPOI): Promise<DocumentResponse> {
        if (await !this.checkIsExist(poiUpdate.name)) return {success: false, message: "The point of interest cannot be updated"}
        try {
            const poi = await PoiModel.updateOne({name: poiUpdate.name}, poiUpdate)
            return {success: true, message: "The point of interest was successfully updated !", data: poi}
        } catch(e) {
            return {success: false, message: "An intern error has occured"}
        }
    }

    async getAll(): Promise<DocumentResponse> {
        try {
            const pois: PoiDocument[] = await PoiModel.find();
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

    async checkIsExist(name: string): Promise<boolean> {
        const isPoiExist = await PoiModel.findOne({name})
        return isPoiExist !== null
    }
}

export default PoiService