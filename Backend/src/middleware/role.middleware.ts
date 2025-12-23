import { AuthRequest } from "../types";
import { NextFunction, Response } from "express";

export const teacherOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.userId != "teacher"){
        return res.status(403).json({
            sucess : false,
            message : "Forbidden, teacher access required"
        })
    }
    next();
}

export const studentOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.userId != "student"){
        return res.status(403).json({
            sucess : false,
            message : "Forbidden, student access required"
        })
    }
    next();
}

