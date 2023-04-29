import { JWT_SECRET } from "../config";
import { Request, Response } from "express";
import { UserModel } from "../model";
import jwt from "jsonwebtoken";

export class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const userCount = await UserModel.countDocuments();
      if (userCount === 1) {
        res.status(500).json({ message: "User already exists" });
      } else if (userCount === 0) {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).json({ message: "Moderator created successfully" });
      } else {
        res.status(500).json("Internal server error");
      }
    } catch (err) {
      res.status(500).json("Internal server error");
    }
  }

  async loginController(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({ error: "Invalid email or password" });
    }

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(500).json({ error: "Invalid email or password" });
      }

      const isPasswordMatch = user.password === password ? true : false;

      if (!isPasswordMatch) {
        return res.status(500).json({ error: "Invalid email or password" });
      }

      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        JWT_SECRET
      );

      return res
        .status(200)
        .json({ message: "Successfully logged in", token: jwtToken });
    } catch (error) {
      console.log("Error occurred while logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
