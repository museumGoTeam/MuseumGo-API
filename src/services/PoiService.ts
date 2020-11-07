import { Error } from 'mongoose'
import PoiModel from '../models/Poi';
import { DocumentResponse } from './type';


class PoiService {

    async insertOne(name: string): Promise<void> {
        if (await this.checkIsExist(name)) return
        try {
            const poi = new PoiModel({name})
            await poi.save()
        } catch(e) {
            const error: Error = e
        }
    }

    async checkIsExist(name: string): Promise<boolean> {
        const isPoiExist = await PoiModel.findOne({name})
        console.log(isPoiExist)
        return isPoiExist !== null
    }
}

export default PoiService