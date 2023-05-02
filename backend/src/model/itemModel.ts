import { Document, Schema, model } from "mongoose";

export interface IItem extends Document {
  name: string;
  createdBy: string;
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const ItemModel = model<IItem>("item", ItemSchema);
