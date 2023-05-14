import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyUser = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json("Unauthorized: No token provided")
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.siteId = decoded.siteId
  next()
}