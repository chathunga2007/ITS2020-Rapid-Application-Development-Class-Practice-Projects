import { Request, Response } from "express"
import { UserModel, UserRole } from "../models/user.model"
import bcrypt from "bcryptjs"
import { signAccessToken, signRefershToken } from "../util/jwt_token"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const extUser = await UserModel.findOne({ email })
    if (extUser) {
      return res.status(400).json({
        message: "User already exists..!"
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      roles: [UserRole.USER],
      approve: true
    })
    await newUser.save()
    res.status(201).json({ message: "User registered successfully..!" })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Registration fail",
      error: err
    })
  }
}


export const login = async (req: Request, res: Response) => {
  try {
    // Extract email and password
    const { email, password } = req.body

    // Validate payload
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required..!"
      })
    }

    // Find user in database
    const user = await UserModel.findOne({ email })

    // Verify credentials
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password..!"
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password..!"
      })
    }

    const accesToken = signAccessToken(user)
    const refreshToken = signRefershToken(user)

    // Successful authentication
    return res.status(200).json({
      message: "Login successful..!",
      data: {
        email: user.email,
        roles: user.roles,
        access_token: accesToken,
        refresh_token: refreshToken
      }
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Login failed..!"
    })
  }
}