import { Router } from 'express'
import { FZ_FILENAME } from '../constants'
import FileUtil from '../utils/FileUtil'

const router = Router()


router.get("/", async (req, res) => {
    const cells = await FileUtil.fileToCells(FZ_FILENAME)
    res.status(200).json(cells)
})


export default router