import { Document, Schema, model } from "mongoose";

export interface ICRUD extends Document {
  gameName: string;
  gameImage?: string;
  gameDescription?: string;
}

const CRUDSchema: Schema = new Schema(
  {
    gameName: { type: String, required: true },
    gameImage: { type: String, default: "" },
    gameDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export const CrudModel = model<ICRUD>("crud", CRUDSchema);
