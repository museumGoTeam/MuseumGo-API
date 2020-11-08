import { Router } from "express";
import PoiService from "../services/PoiService";
import { DocumentResponse } from "../services/type";

const router = Router();
const _context = new PoiService();


router.get("/", async (req, res) => {
    const pois: DocumentResponse= await _context.getAll();
    res.status(200).json(pois)
})

export default router;
