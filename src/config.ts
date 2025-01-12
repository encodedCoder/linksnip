import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI!,
  dbName: process.env.DB_NAME!,
  collectionName: process.env.COLLECTION_NAME!,
};
