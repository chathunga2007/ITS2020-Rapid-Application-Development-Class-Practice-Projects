import { Router } from "express"
import { createItem, getItems } from "../controllers/item.controller"

const router = Router()

router.post("/", createItem)
router.get("/all", getItems)

export default router // defalut export only use one time