import { Request, Router } from "express";
import RoomService from "../services/RoomService";
import { IRoom } from "../services/type";

const router = Router();
const _context = new RoomService();

router.get("/", async (req, res) => {
  const response = await _context.getAll();
  res.status(200).json(response);
});

router.get<{_id: string}>("/:_id", async (req, res) => {
  const response = await _context.getOne({_id: req.params._id})
  return res.status(200).json(response)
});

router.put("/", async (req: Request<{}, {}, IRoom>, res) => {
  const room = req.body
  const response = await _context.updateOne(room)
  res.status(200).json(response)
})

router.delete("/:_id", async (req: Request<{_id: string}, {}, {}>, res) => {
  const response = await _context.deleteOne(req.params._id)
  res.status(200).json(response)
})

export default router;
