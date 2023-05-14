import express from "express"
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteControllers.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const router = express.Router()

router.post("/create", verifyUser, createNote)
router.get("/", verifyUser, getNotes)
router.put(":id", verifyUser, updateNote)
router.delete(":id", verifyUser, deleteNote)

export default router