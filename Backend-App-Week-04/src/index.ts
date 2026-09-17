// console.log("Hello, World...")

import express from "express"
import mongoos, { model, Schema } from "mongoose"

const app = express()
const port = 3000

// JSON -> JS Obj
// Parse raw network JSON info JavaScript objects
app.use(express.json())

//Document
const itemSchema = new Schema({
    // mongodb data types (String, Number)
  name: {type: String, require: true},  
  price: {type: Number, require: true}, 
})

const ItemModel = model("items", itemSchema)

// POST API Call
app.post("/api/v1/item", async (req, res) => {
    try{
        const { name, price } = req.body

        const newItem = new ItemModel({
            name: name,
            price: price
        })

        const savedItem = await newItem.save()

        // const name = body.name
        // const price = body.price

        // res.send(body)

        res.status(201).json({
            message: "Success",
            data: savedItem
        })
        console.log(savedItem)
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: "Fail!",
            DataTransfer: null
        })
    }
})

app.get("/api/v1/item", async (req, res) => {
    try{
        const items = await ItemModel.find()
        res.status(200).json({
            message: "Success",
            data: items
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: "Fail!",
            DataTransfer: null
        })
    }
})

// GET API Call
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

mongoos
    .connect("mongodb://localhost:27017/node_backend_test_pro_01")
    .then((res) => {
        console.log("DB Connected!")
        // only run when after db connected
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.error("DB Fail: ", err)
    })