import dotenv from "dotenv"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../schemas/user.js"

dotenv.config()

export const createUser = async (req, res) => {
  const { email, pass } = req.body
  const foundUser = await User.findOne({email})
  if (foundUser) {
    return res.status(401).json("user already exists")
  }
  const dateCreated = new Date()
  const siteId = [...Array(10)].map(() => Math.random().toString(36)[2]).join('')
  bcrypt.genSalt(15, function ( err, salt ) {
    if (err){
      return res.status(500).json("error generating salt")
    }
    bcrypt.hash(pass, salt, async function(err, hash) {
      if (err) {
        return res.status(500).json("error in hashing password")
      }
      const newUser = new User({
        email,
        siteId,
        password: hash,
        salt,
        dateCreated
      })
      const savedUser = newUser.save()
      if (!savedUser){
        return res.staus(500).json("failed to save user in the database")
      }
      const token = jwt.sign({ userId: siteId, userEmail: email}, process.env.JWT_SECRET, { expiresIn: '7d'})
      return res.status(200).json({token, message: "User Signed up successfully"})
    })
  })
}

export const getUser = async (req, res) => {
  const { email, pass } = req.body
  const foundUser = await User.findOne({email})
  if (!foundUser){
    return res.status(404).json("User not found")
  }
  bcrypt.hash(pass, foundUser.salt, async function (err, newHash) {
    if (err){
      return res.status(500).json("error in decrypting password")
    }
    const result = await bcrypt.compare(pass, newHash)
    if (result) {
      const token = jwt.sign({userId: foundUser.siteId, email}, process.env.JWT_SECRET, {expiresIn: '7d'})
      return res.status(200).json({token, message: "User logged in successfully"})
    } else {
      return res.status(401).json("Incorrect password")
    }
  })
}

export const updateUser = async (req, res) => {
  const newPass = req.body.newPass
  const siteId = req.siteId
  bcrypt.hash(newPass, foundUser.salt, async function (err, hash) {
    if (err){
      return res.status(500).json("Error encrypting new password")
    }
    const newUser = User.findOneAndUpdate({siteId}, {password: hash})
    if (!newUser) {
      return res.status(500).json("could not update user")
    }
    return res.status(200).json("User updated successfully")
  })
}

export const deleteUser = async (req, res) => {
  const siteId = req.siteId
  const deletedUser = User.findOneAndDelete({siteId})
  if (!deletedUser){
    return res.status(500).json("failed to delete user")
  }
  return res.status(200).json("User deleted successfully")
}