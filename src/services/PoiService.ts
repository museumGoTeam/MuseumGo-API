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

    async getAll(): Promise<DocumentResponse> {
        try {
            const pois: PoiDocument[] = await PoiModel.find();
            return {success: true, data: pois}
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