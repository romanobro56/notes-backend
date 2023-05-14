import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
  contents: { type: String },
  dateCreated: { type: Date, required: true },
  noteId: { type: String, required: true },
  ownerId: { type: String, required: true },
  color: { type: String, required: true },
  completed: { type: Boolean, required: true }
})

const Note = mongoose.model("Note", noteSchema)

export default Note