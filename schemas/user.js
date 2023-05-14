import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  siteId: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  salt: { type: String, required: true },
  dateCreated: { type: Date, required: true }
})

const User = mongoose.model("User", userSchema)

export default User