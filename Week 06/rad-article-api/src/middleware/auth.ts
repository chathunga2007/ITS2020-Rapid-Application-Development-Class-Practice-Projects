import "dotenv/config"
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthRequest extends Request {
    user?: any
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing...!"
        })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            message: "Token missing...!"
        })
    }

    try {
        const payload = await jwt.verify(token, JWT_SECRET)
        req.user = payload
        next()
    } catch (err: any) {
        return res.status(401).json({
            message: err.name === "TokenExpiredError" ? "Token expired, please login again...!" : "Invalid token...!"
        })
    }
}

export const optionalAuthenticate = async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]
        if (token) {
            try {
                const payload = jwt.verify(token, JWT_SECRET)
                req.user = payload
            } catch {
                // Ignore token error and continue as guest
            }
        }
    }
    next()
}

export * from "./role"