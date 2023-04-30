import { Request, Response } from "express";
import { ItemModel } from "../model";

export class ItemController {
  async itemList(req: Request, res: Response): Promise<void> {
    try {
      const data = await ItemModel.find().sort({ _id: -1 });
      res.json({ data });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async newItem(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const duplicate = await ItemModel.findOne({ name });
      if (duplicate) {
        res.status(400).json({ error: "Duplicate data not allowed" });
        return;
      }

      const newReview = {
        name,
      };
      const review = new ItemModel(newReview);
      await review.save();
      res
        .status(201)
        .json({ data: review, message: "Data created sucessfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const itemId = req.params.id;
      const item = await ItemModel.findById(itemId);

      if (!item) {
        res.status(404).json({ error: "Data not found" });
        return;
      }

      if (name) {
        item.name = name;
      }

      await item.save();
      res.json({ data: item, message: "Update sucessfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await ItemModel.findByIdAndDelete(id);
      if (!data) {
        res.status(404).json({ error: "Data not found" });
        return;
      }
      res.json({ message: "Data deleted" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async itemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const review = await ItemModel.findById(id);

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
