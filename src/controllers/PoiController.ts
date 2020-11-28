import { json, Request, Router } from "express";
import PoiService from "../services/PoiService";
import { DocumentResponse, IPOI } from "../services/type";

const router = Router();
const _context = new PoiService();


router.get("/", async (req, res) => {
    console.log("Coucou")
    const pois: DocumentResponse= await _context.getAll();
    res.status(200).json(pois)
})

router.get<{_id: string}>('/:_id', async (req, res) => {
    const poi: DocumentResponse = await _context.getOne(req.params._id)
    res.status(200).json(poi)
})


router.put("/", async (req: Request<{}, {}, IPOI>, res) => {
    const poi = req.body
    const response = await _context.updateOne(poi)
    res.status(200).json(response)
})


router.delete("/:_id", async (req: Request<{_id: string}, {}, {}>, res) => {
    const response = await _context.deleteOne(req.params._id)
    res.status(200).json(response)
})

export default router;
