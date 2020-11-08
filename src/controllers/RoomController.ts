import { Router } from "express";
import RoomService from "../services/RoomService";

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

export default router;
