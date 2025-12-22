import { Request } from "express";

export interface JWTPayload {
    userId : string,
    role   : "teacher" | "student"
}

export interface AuthRequest extends Request {
    user? : JWTPayload
}

export interface ActiveSession {
    classId : string,
    startedAt : string,
    attendance : {
        [studentId : string] : "present" | "absent"
    }
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
}