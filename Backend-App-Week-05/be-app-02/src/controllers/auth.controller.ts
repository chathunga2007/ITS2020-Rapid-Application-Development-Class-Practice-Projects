import { Request, Response } from "express";
import { authModel } from "../models/auth.model";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, name, email, password, roles, approve } = req.body;

    // Check required fields
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required!",
        data: null,
      });
      return;
    }

    // Check if user already exists
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User already exists with this email!",
        data: null,
      });
      return;
    }

    // Handle roles: default to ["USER"] if not provided
    let userRoles: string[] = ["USER"];
    if (Array.isArray(roles) && roles.length > 0) {
      userRoles = roles.map((r: string) => String(r).toUpperCase());
    } else if (typeof roles === "string" && roles.trim()) {
      userRoles = [roles.trim().toUpperCase()];
    }

    // Handle approve: boolean (default false)
    let isApproved = false;
    if (typeof approve === "boolean") {
      isApproved = approve;
    } else if (typeof approve === "string") {
      isApproved = approve.toLowerCase() === "true";
    }

    const salt = bcrypt.genSaltSync(10)
    const handlePassword = bcrypt.hashSync(password, salt)
    

    const newUser = new authModel({
      username: username || name,
      name: name || username,
      email,
      password: handlePassword,
      roles: userRoles,
      approve: isApproved,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed!",
      data: null,
    });
  }
};
