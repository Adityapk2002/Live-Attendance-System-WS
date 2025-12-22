import model = require("mongoose")
import mongoose = require("mongoose")

export type Role = "teacher" | "student"

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ["teacher" , "student"]
    }
})

export const User = mongoose.model("User",userSchema);