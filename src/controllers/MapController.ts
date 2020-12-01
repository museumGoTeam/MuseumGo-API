import { Request, Router } from 'express'
import { FZ_FILENAME } from '../constants'
import MapService from '../services/MapService'
import { IMap, IPOI, ItineraryPos, Pos  } from '../services/type'
import Dijkstra from '../utils/Dijkstra'
import NodeUtil from '../utils/NodeUtil'
import { Node } from '../utils/types'

const router = Router()
const _mapContext = new MapService()


router.get("/", async (req, res) => {
    const response = await _mapContext.GetMap()
    res.status(200).json(response)
})

router.post("/", async (req: Request<{}, {}, IMap & {poisMoved: IPOI[]}>, res) => {
    const body = req.body
    const response = await _mapContext.updateMap(body)
    res.status(200).json(response)
})

router.post('/itinerary', async (req: Request<{}, {}, ItineraryPos>, res) => {
    const {roomPos, poiPos} = req.body
    const mapWithItinerary = await _mapContext.GetItinerary({roomPos, poiPos})
    res.status(200).json(mapWithItinerary)
})


export default router