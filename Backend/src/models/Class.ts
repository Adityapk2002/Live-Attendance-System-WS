import mongoose, { model, Schema, Types } from "mongoose";

const classSchema = new Schema({
    className : String,
    teacherId : {
        type : Types.ObjectId,
        ref : "User"
    },
    studentIds : [{
        type : Types.ObjectId,
        ref  : "User"
    }]
})
export const Class = mongoose.model("Class",classSchema)