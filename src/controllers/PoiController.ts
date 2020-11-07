import { Router } from "express";
import PoiService from "../services/PoiService";

const router = Router();
const _context = new PoiService();


router.post("/", async (req, res) => {
    const poiName = req.body.name
    const response = await _context.insertOne(poiName)
    res.status(200).json(response)
})

export default router;
