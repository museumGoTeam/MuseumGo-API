import { Router } from "express";
import RoomService from "../services/RoomService";

const router = Router();
const _context = new RoomService();

router.get("/", async (req, res) => {
  const rooms = await _context.getAll();
  res.status(200).json(rooms);
});

router.get<{_id: string}>("/:_id", async (req, res) => {
  const room = await _context.getOne(req.params._id)

  if (room) {
    res.status(200).json({success: true, data: room})
  } else {
    res.status(404).json({message: "La pièce n'éxiste pas", success: false})
  }
});
export default router;
