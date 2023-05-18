import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json("Unauthorized: No token provided")
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.email = decoded.email
    req.siteId = decoded.userId //gotta fix this so that decoded.siteId
    next()
  } catch {
    return res.status(401).json("token invalid")
  }
}