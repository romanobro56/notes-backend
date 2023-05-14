import dotenv from "dotenv"
import mongoose from "mongoose"
import Note from "../schemas/note.js"
import User from "../schemas/user.js"

dotenv.config()

export const create = async (req, res) =>{
  const { contents, color } = req.body
  const siteId = req.siteId
  if (!siteId) {
    return res.status(401).json("No user authentication attached")
  }
  const dateCreated = new Date()
  const newNote = new Note({
    contents, 
    dateCreated,
    noteId: [...Array(10)].map(() => Math.random().toString(36)[2]).join(''),
    ownerId: siteId,
    color,
    completed: false
  })
  const savedNote = await newNote.save()
  if (!savedNote) {
    return res.status(500).json("Failed to save note in database")
  }
  return res.status(200).json("Note saved in database")
}

export const getNotes = async (req, res) => {
  const siteId = req.siteId
  const noteObjects = await Note.find({ownerId: siteId})
  if (!noteObjects) {
    return res.status(404).json("Notes not found")
  }
  for (let i = 0; i < noteObjects.length; i++) {
    delete noteObjects[i]._id
    delete noteObjects[i].ownerId
    delete noteObjects[i].__v
  }
  return res.status(200).json(noteObjects)
}

export const updateNote = async (req, res) => {
  const ownerId = req.siteId 
  const noteId = req.params.id
  const { contents, color, completed } = req.body
  const updated = await Note.findOneAndUpdate({noteId , ownerId}, {
    contents,
    color,
    completed
  })
  if (!updated) {
    return res.status(500).json("Failed to update note in database")
  }
  return res.status(200).json("Updated note in database")
}

export const deleteNote = async (req, res) => {
  const siteId = req.siteId
  const noteId = req.params.id
  const deletedNote = await Note.findOneAndDelete({siteId, noteId})
  if(!deletedNote) {
    return res.status(404).json("Note not found")
  }
  return res.status(200).json("Note deleted in database")
}