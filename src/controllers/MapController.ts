import express, { Router } from 'express'
import { FZ_FILENAME } from '../constants'
import PoiService from '../services/PoiService'
import { DocumentResponse, IPOI, IRoom } from '../services/type'
import FileUtil from '../utils/FileUtil'

const router = Router()
const _poiContext = new PoiService()




router.get("/", async (req, res) => {
    const cells: number[][]  = await FileUtil.fileToCells(FZ_FILENAME)
    const pois: DocumentResponse= await  _poiContext.getAll()
    res.status(200).json({map: cells, pois: pois.data, rooms: []})
})

router.post("/", (req, res) => {
    req.url = "/"
    const {cells, pois, rooms}: {cells: number[][], pois: IPOI[], rooms: IRoom[]} = req.body
    pois.forEach(async poi => {
        await _poiContext.insertOne(poi)
    })
    FileUtil.cellsToFile(FZ_FILENAME, cells)
    res.status(200).json({message: "The map is saved !", success: true})
})


export default router