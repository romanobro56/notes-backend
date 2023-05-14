import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import noteRoutes from "./routes/noteRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ limit: "1mb", extended: true}))
app.use(bodyParser.json({limit: "1mb", extended: true}))

app.use("/notes", noteRoutes)
app.use("/users", userRoutes)

const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() =>{
  app.listen(port, () => console.log("listening on " + port))
}).catch((err) => console.log(err))