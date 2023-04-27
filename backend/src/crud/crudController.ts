import { Request, Response } from "express";
import { CrudModel } from "./crudModel";

export class CURDController {
  async list(req: Request, res: Response): Promise<void> {
    try {
      const data = await CrudModel.find();
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async newData(req: Request, res: Response): Promise<void> {
    try {
      const { gameName, gameImage, gameDescription } = req.body;
      if (!gameName) {
        res.status(400).json({ error: "gameName is required" });
        return;
      }
      const duplicate = await CrudModel.findOne({ gameName });
      if (duplicate) {
        res.status(400).json({ error: "Duplicate data not allowed" });
        return;
      }
      const newReview = {
        gameName,
        gameImage: gameImage || "",
        gameDescription: gameDescription || "",
      };
      const review = new CrudModel(newReview);
      await review.save();
      res
        .status(201)
        .json({ data: review, message: "Data created sucessfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateData(req: Request, res: Response): Promise<void> {
    try {
      const { gameName, gameImage, gameDescription } = req.body;
      const gameId = req.params.id;
      const game = await CrudModel.findById(gameId);

      if (!game) {
        res.status(404).json({ error: "Data not found" });
        return;
      }

      if (gameName) {
        game.gameName = gameName;
      }
      if (gameImage) {
        game.gameImage = gameImage;
      }
      if (gameDescription) {
        game.gameDescription = gameDescription;
      }

      await game.save();
      res.json({ data: game, message: "Update sucessfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteData(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await CrudModel.findByIdAndDelete(id);
      if (!data) {
        res.status(404).json({ error: "Data not found" });
        return;
      }
      res.json({ message: "Data deleted" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async dataById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const review = await CrudModel.findById(id);

      if (!review) {
        res.status(404).json({ error: "Data not found" });
        return;
      }
      res.json({ data: review });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
