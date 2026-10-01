import express, { type Request, type Response } from "express"
import AuthRouter from "./routes/auth.routers"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT 
const URL = process.env.MONGO_LOCAL_URL || ""

const app = express()

app.use(express.json())

app.use("/api/v1/auth", AuthRouter)

mongoose
  .connect(URL)
  .then((res) => {
    console.log("DB Connected!")
    // only run when after db connected
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("DB Fail: ", err)
  })
