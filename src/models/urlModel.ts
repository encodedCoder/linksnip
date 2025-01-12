import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const UrlModel = mongoose.model<IUrl>("Url", UrlSchema);
