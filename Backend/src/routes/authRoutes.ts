import { Router } from "express";
import bcrypt from "bcrypt";
import { loginSchema, signupSchema } from "../validators/auth.schema";
import { User } from "../models/User";
import  jwt from "jsonwebtoken";

const router = Router();

router.post('/signup',async(req,res) => {
    try{
        const validateData = signupSchema.parse(req.body)

        const existingUser = await User.findOne({
            email : validateData.email
        }); 

        if(!existingUser){
            res.status(400).json({
                message : "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(validateData.password,10)

        const user = await User.create({
            email : validateData.email,
            password : hashedPassword,
            name : validateData.name,
            role : validateData.role
        })
        
        return res.status(201).json({
            success : true,
            data    : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

router.post('/login',async(req,res) => {
    try{
        const validateData = loginSchema.parse(req.body)
        const user = await User.findOne({
            email : validateData.email
        });
        if(!user){
            return res.status(400).json({
                sucess : false,
                message : "Invalid email and password"
            });
        }

        const isPasswordValid = await bcrypt.compare(validateData.password,user.password || "");
        if(!isPasswordValid){
             return res.status(400).json({
                sucess : false,
                message : "Invalid email and password"
            })
        }
        const token = jwt.sign({
            userId : user._id.toString(),
            role  : user.role
        },
        process.env.JWT_SECRET!,
        {expiresIn : '7d'}
        )

        return res.status(200).json({
            success : true,
            data : {
                token
            }
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

export default router;