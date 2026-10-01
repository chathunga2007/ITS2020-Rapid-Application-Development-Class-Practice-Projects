import { NextFunction, Response } from "express"
import { AuthRequest } from "./auth"
import { UserRole } from "../models/user.model"

export const authorize = (role: UserRole) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user

        // 1. Check user and roles exist
        if (!user || !user.roles) {
            return res.status(403).json({
                message: "Access denied...!"
            })
        }

        // 2. Check if user has the required role
        if (user.roles.includes(role) || user.roles.includes(String(role))) {
            return next()
        }

        // 3. If role doesn't match
        return res.status(403).json({
            message: "Access denied: Unauthorized role...!"
        })
    }
}

export const isAdmin = authorize(UserRole.ADMIN)
