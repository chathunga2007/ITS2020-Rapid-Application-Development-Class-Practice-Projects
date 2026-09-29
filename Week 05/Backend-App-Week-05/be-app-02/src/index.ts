import express, { Request, Response } from 'express';
import itemRoute from "./routes/item.route" // default export import not use {}
import authRoute from "./routes/auth.route"
import mongoos, { model, Schema } from "mongoose"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;

// JSON -> TS
app.use(express.json())
app.use(cors())

// Gloabl Middleware
app.use((req, res, next) => {
  console.log("---Hello---")
  // if (true) next()
  //   else res.send("Logic fail")
  next()
})

// const testMidl = (req, res, next) => {
//   next()
// }

app.get('/', /*testMidl,*/(req: Request, res: Response) => {

  console.log("---Hi---")
  res.send('Hello from be-app-02 API!');
});

app.use("/api/v1/item", itemRoute)
app.use("/api/v1/auth", authRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoos
  .connect("mongodb://localhost:27017/node_backend_test_pro_01")
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