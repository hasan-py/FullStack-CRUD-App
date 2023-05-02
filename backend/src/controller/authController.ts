import { JWT_SECRET } from "../config";
import { Request, Response } from "express";
import { UserModel } from "../model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const User = await UserModel.findOne({ email: req.body.email });

      if (!User) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const newUser = new UserModel({
          ...req.body,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ message: "User created successfully" });
      } else {
        res.status(500).json("User already exists");
      }
    } catch (err) {
      res.status(500).json("Internal server error");
    }
  }

  async loginController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(500).json({ error: "Invalid email or password" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(500).json({ error: "Invalid email or password" });
      }

      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        JWT_SECRET
      );

      return res.status(200).json({
        message: "Successfully logged in",
        token: jwtToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log("Error occurred while logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
