import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

// Load environment variables (.env)
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// Default route
app.get("/", (req, res) => res.send("🚀 Hello from server (Running on localhost:5001)"));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Start server function
const startServer = async () => {
  try {
    // Connect MongoDB (if you have MONGO_URI in .env)
    await connectDB();

    // Set fallback port if ENV.PORT not found
    const PORT = ENV.PORT || process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`✅ Server is up and running on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Run the server
startServer();

// Export for deployment (Vercel)
export default app;



// import express from "express";
// import cors from "cors";
// import { clerkMiddleware } from "@clerk/express";

// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import commentRoutes from "./routes/comment.route.js";
// import notificationRoutes from "./routes/notification.route.js";

// import { ENV } from "./config/env.js";
// import { connectDB } from "./config/db.js";
// import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(clerkMiddleware());
// app.use(arcjetMiddleware);

// app.get("/", (req, res) => res.send("Hello from server"));

// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/notifications", notificationRoutes);

// // error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).json({ error: err.message || "Internal server error" });
// });

// const startServer = async () => {
//   try {
//     await connectDB(); // Commented out backend connectivity: database connection listen for local development
//     if (ENV.NODE_ENV !== "production") { // Commented out backend connectivity: server listening
//       app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
//     }
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

// // export for vercel
// export default app;
