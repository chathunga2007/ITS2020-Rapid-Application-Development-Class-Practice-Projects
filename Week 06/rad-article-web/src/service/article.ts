import api from "./api"

export interface IArticle {
  _id: string
  title: string
  content: string
  author: string
  imageURL?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  message: string
  data: T
}

export const createArticle = async (formData: FormData): Promise<ApiResponse<IArticle>> => {
  const res = await api.post("article/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllArticles = async (): Promise<ApiResponse<IArticle[]>> => {
  const res = await api.get("article")
  return res.data
}

export const getArticleById = async (id: string): Promise<ApiResponse<IArticle>> => {
  const res = await api.get(`article/${id}`)
  return res.data
}

export const deleteArticle = async (id: string): Promise<ApiResponse<void>> => {
  const res = await api.delete(`article/${id}`)
  return res.data
}
