import express, {Response} from 'express'
import mongoose from 'mongoose'
import RoomController from './controllers/RoomController'
import PoiController from './controllers/PoiController'
import MapController from './controllers/MapController'
import { ICheckConnectivity } from './services/type'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './API_DOC_JSON.json'

const app = express()


app.get('/', (req, res: Response<ICheckConnectivity>) => {
    res.status(200).json({status: "ok"})
})

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/rooms', RoomController)
app.use("/api/poi", PoiController)
app.use('/api/map', MapController)



const PORT = 5000


app.listen(PORT, () => {
    try {
        mongoose.connect("mongodb://localhost:27017/museumGO?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('It is working')
    } catch(e) {
        console.log("Error when connecting with the server", e)
    }
})

