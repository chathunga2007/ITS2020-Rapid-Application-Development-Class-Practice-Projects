import "dotenv/config"
import express, { type Request, type Response } from "express"
import AuthRouter from "./routes/auth.routers"
import ArticleRouter from "./routes/article.routers"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"

const PORT = process.env.PORT || 3000
const URL = process.env.MONGO_LOCAL_URL || ""

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads folder for uploaded article images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/article", ArticleRouter)

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
