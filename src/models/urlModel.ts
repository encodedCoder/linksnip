import mongoose, { Schema, Document } from "mongoose";

interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  hostname: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true },
  hostname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UrlModel = mongoose.model<IUrl>("Url", UrlSchema);

export default UrlModel;
