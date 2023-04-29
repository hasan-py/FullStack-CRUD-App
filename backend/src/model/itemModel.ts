import { Document, Schema, model } from "mongoose";

export interface IItem extends Document {
  name: string;
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const ItemModel = model<IItem>("item", ItemSchema);
