import { Request, Response } from "express"
import { itemModel } from "../models/item.model"

export const createItem = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body

        const newItem = new itemModel({ name, price })
        const saved = await newItem.save()

        res.status(200).json({
            message: "OK",
            data: saved
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Fail!",
            data: null
        })
    }
    // res.send("Create Item")
}

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await itemModel.find()
        res.status(200).json({
            message: "Success",
            data: items
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Fail!",
            data: null
        })
    }
    // res.send("Get Items")
}