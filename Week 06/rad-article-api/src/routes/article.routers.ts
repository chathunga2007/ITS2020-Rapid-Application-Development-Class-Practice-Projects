import { Router } from "express"
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById
} from "../controllers/article.controller"
import { upload } from "../middleware/upload"
import { optionalAuthenticate } from "../middleware/auth"

const router = Router()

// Middleware that accepts "image" or "file" field name
const uploadMiddleware = (req: any, res: any, next: any) => {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 }
  ])(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        message: err.message || "File upload error..!"
      })
    }
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }
      req.file = files["image"]?.[0] || files["file"]?.[0]
    }
    next()
  })
}

// POST /api/v1/article/create
router.post("/create", optionalAuthenticate, uploadMiddleware, createArticle)

// POST /api/v1/article (fallback)
router.post("/", optionalAuthenticate, uploadMiddleware, createArticle)

// GET /api/v1/article & /api/v1/article/all
router.get("/all", getAllArticles)
router.get("/", getAllArticles)

// GET /api/v1/article/:id
router.get("/:id", getArticleById)

// DELETE /api/v1/article/:id
router.delete("/:id", deleteArticle)

export default router
