import { Router } from 'express'
import { FZ_FILENAME } from '../constants'
import FileUtil from '../utils/FileUtil'

const router = Router()


router.get("/", async (req, res) => {
    const cells: number[][]  = await FileUtil.fileToCells(FZ_FILENAME)
    res.status(200).json(cells)
})

router.post("/save", (req, res) => {
    const cells: number[][] = req.body.cells
    FileUtil.cellsToFile(FZ_FILENAME, cells)
    res.status(200).json({message: "The map is saved !", success: true})
})


export default router