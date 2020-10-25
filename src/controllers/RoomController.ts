import { Router } from "express";
import RoomService from "../services/RoomService";

const router = Router();
const _context = new RoomService();

router.get("/", async (req, res) => {
  const response = await _context.getAll();
  res.status(200).json(response);
});


router.get<{pos: string}>("/:pos", async (req, res) => {
  const response = await _context.getOne({posStr: req.params.pos})
  return res.status(200).json(response)
});

export default router;
