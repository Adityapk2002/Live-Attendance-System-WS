import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { teacherOnly } from "../middleware/role.middleware";
import { AuthRequest } from "../types";
import { addStudentSchema, createClassSchema } from "../validators/class.schema";
import { Class } from "../models/Class";
import { User } from "../models/User";
import mongoose from "mongoose";

const router = Router();

router.post('/', authenticate, teacherOnly, async(req : AuthRequest, res) => {
    try{
        const validateData = createClassSchema.parse(req.body);

        const newData = await Class.create({
            className : validateData.className,
            teacherId : req.user?.userId,
            studentIds : []
        })
        return res.status(201).json({
            success : true,
            data    : {
                _id : newData._id,
                className : newData.className,
                teacherId : newData.teacherId,
                studentIDs : newData.studentIds
            }
        })
    }
    catch(error : any){
        if(error.name === "ZodError"){
            return res.status(400).json({
                success : false,
                message : "Invalid schema"
            })
        }
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

router.post('/:id/add-student', authenticate, teacherOnly , async(req : AuthRequest, res) => {
    try{
    const validateData = addStudentSchema.parse(req.body);
    const classId = req.params.id;
    
    const classData = await Class.findById({classId})
    if(!classData){
        res.status(404).json({
            success : false,
            message : "No class found!"
        })
    }

    if(classData?.teacherId?.toString() != req.user?.userId){
        res.status(400).json({
            success : false,
            message : "Forbidden, not class teacher!"
        })
    }

    const student = await User.findById(validateData.studentId)
    if(!student){
        res.status(404).json({
            success : false,
            message : "No student found"
        })
    }

    if(student?.role !== 'student'){
        res.status(400).json({
            success : false,
            message : "User is not a student"
        })
    }

      if (!classData?.studentIds.some(id => id.toString() === validateData.studentId)) {
      classData?.studentIds.push(new mongoose.Types.ObjectId(validateData.studentId));
      await classData?.save();
    }

    return res.status(200).json({
        success : true,
        data : {
            _id : classData?._id,
            className : classData?.className,
            teacherId : classData?.teacherId,
            studentIds : classData?.studentIds
        }
    })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

export default router;