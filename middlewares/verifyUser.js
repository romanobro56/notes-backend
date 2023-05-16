import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  console.log(token)
  if (!token) {
    return res.status(401).json("Unauthorized: No token provided")
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded)
  req.siteId = decoded.userId //gotta fix this so that decoded.siteId
  next()
}