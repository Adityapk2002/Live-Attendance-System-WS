import mongoose, { Schema, Types } from "mongoose";

export const attendanceSchema = new Schema({
    classId : {
        type : Types.ObjectId,
        ref  : "Class"
    },
    studentId : {
        type : Types.ObjectId,
        ref  : "User"
    },
    status : {
        type : String,
        enum : ["present" , "absent"]
    }
})

export const Attendance = mongoose.model("Attendance",attendanceSchema)