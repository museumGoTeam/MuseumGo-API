import { Model, Document } from "mongoose";


abstract class Service<T extends Document> {
    context: Model<T>
    
    constructor(model: Model<T>) {
        this.context = model
    }

    
    async getAll(): Promise<T[]> {
        const documents = await this.context.find()
        return documents
    }

    abstract async getOne(id: string) : Promise<T | null>
}

export default Service