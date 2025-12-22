import { NextFunction, Response } from "express";
import { AuthRequest, JWTPayload, ErrorResponse } from "../types";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_only"

export const authenticate = (req : AuthRequest , res : Response , next : NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success : false,
                error   : "Unauthorized , token missing or invalid!"
            });
        }

        const decoded = jwt.verify(token , JWT_SECRET) as JWTPayload
        req.user = decoded
        next()
    }
    catch(error){
        const errorResponse: ErrorResponse = {
            success : false,
            error   : "Unauthorized , token missing or invalid!"
        };
        res.status(401).json(errorResponse);
    }
}