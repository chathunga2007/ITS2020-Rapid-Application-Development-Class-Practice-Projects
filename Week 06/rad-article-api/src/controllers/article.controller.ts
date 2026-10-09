import { Request, Response } from "express"
import { ArticleModel } from "../models/article.model"
import { AuthRequest } from "../middleware/auth"

export const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, author, tags } = req.body

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required..!"
      })
    }

    // Determine author
    const articleAuthor =
      (author && typeof author === "string" && author.trim()) ||
      req.user?.name ||
      req.user?.email ||
      "Anonymous"

    // Determine imageURL
    let imageURL = ""
    if (req.file) {
      // Constructed full URL to access uploaded static file
      imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    } else if (req.body.imageURL) {
      imageURL = String(req.body.imageURL).trim()
    }

    // Parse tags
    let parsedTags: string[] = []
    if (tags) {
      if (Array.isArray(tags)) {
        parsedTags = tags.map((t) => String(t).trim()).filter(Boolean)
      } else if (typeof tags === "string") {
        try {
          const json = JSON.parse(tags)
          if (Array.isArray(json)) {
            parsedTags = json.map((t) => String(t).trim()).filter(Boolean)
          } else {
            parsedTags = tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          }
        } catch {
          parsedTags = tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        }
      }
    }

    // Create new article
    const newArticle = new ArticleModel({
      title: title.trim(),
      content: content.trim(),
      author: articleAuthor,
      imageURL,
      tags: parsedTags
    })

    const savedArticle = await newArticle.save()

    return res.status(201).json({
      message: "Article created successfully..!",
      data: savedArticle
    })
  } catch (err: any) {
    console.error("Create article error:", err)
    return res.status(500).json({
      message: "Failed to create article..!",
      error: err.message || err
    })
  }
}

export const getAllArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await ArticleModel.find().sort({ createdAt: -1 })
    return res.status(200).json({
      message: "Articles fetched successfully..!",
      data: articles
    })
  } catch (err: any) {
    console.error("Get articles error:", err)
    return res.status(500).json({
      message: "Failed to fetch articles..!",
      error: err.message || err
    })
  }
}

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const article = await ArticleModel.findById(id)

    if (!article) {
      return res.status(404).json({
        message: "Article not found..!"
      })
    }

    return res.status(200).json({
      message: "Article fetched successfully..!",
      data: article
    })
  } catch (err: any) {
    console.error("Get article by ID error:", err)
    return res.status(500).json({
      message: "Failed to fetch article..!",
      error: err.message || err
    })
  }
}

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleted = await ArticleModel.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({
        message: "Article not found..!"
      })
    }

    return res.status(200).json({
      message: "Article deleted successfully..!"
    })
  } catch (err: any) {
    console.error("Delete article error:", err)
    return res.status(500).json({
      message: "Failed to delete article..!",
      error: err.message || err
    })
  }
}
