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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required!",
        data: null,
      });
      return;
    }

    // Check if user exists
    const user = await authModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found with this email!",
        data: null,
      });
      return;
    }

    // Verify password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({
        message: "Invalid credentials! Incorrect password.",
        data: null,
      });
      return;
    }

    // Return user details without password
    const userData = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      roles: user.roles,
      approve: user.approve,
    };

    res.status(200).json({
      message: "Login successful!",
      data: userData,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Login failed!",
      data: null,
    });
  }
};

