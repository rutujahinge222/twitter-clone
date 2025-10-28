import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load environment variables (ensure this runs before using process.env)
dotenv.config({ path: "./src/.env" });

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("URI from env:", process.env.MONGO_URI || "❌ Not found");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};