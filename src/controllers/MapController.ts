import { Request, Router } from 'express'
import MapService from '../services/MapService'
import { IMap, IPOI, IRoom } from '../services/type'


const router = Router()
const _mapContext = new MapService()




router.get("/", async (req, res) => {
    const response = await _mapContext.GetMap()
    res.status(200).json(response)
})

router.post("/", async (req: Request<{}, {}, IMap>, res) => {
    const body = req.body
    const response = await _mapContext.updateMap(body)
    res.status(200).json(response)
})


export default router