// SOC

import "dotenv/config"

import { IUser } from "../models/user.model"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

export const signAccessToken = (user: IUser) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles
    },
    JWT_SECRET,
    {
      expiresIn: "30m"
    }
  )
}

export const signRefershToken = (user: IUser) => {
  return jwt.sign(
    {
      sub: user._id.toString()
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  )
}