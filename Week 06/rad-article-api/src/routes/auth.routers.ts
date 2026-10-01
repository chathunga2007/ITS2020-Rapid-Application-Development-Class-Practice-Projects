import { Router } from "express"
import { getMyDetails, login, register } from "./../controllers/auth.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

router.post("/login", login)
router.post("/register", register)

//private
router.get("/me", authenticate, getMyDetails)

export default router