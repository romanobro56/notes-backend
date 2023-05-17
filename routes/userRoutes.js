import express from "express"
import { createUser, getUser, updateUser, deleteUser } from "../controllers/userControllers.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const router = express.Router()

router.post("/create", createUser)
router.post("/login", getUser)
router.put("/update", verifyUser, updateUser)
router.delete("/delete", verifyUser, deleteUser)

export default router