import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import { OK } from "./constants/http.js";
import moviesRoutes from "./routes/movies.routes.js";


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://movies-app-two-woad.vercel.app",
  "https://movies-4g543b10h-ndumisomenzs-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Health check endpoint
app.get("/", (req, res) => {
  return res.status(OK).json({
    status: "healthy",
  });
});

// Auth routes
app.use("/auth", authRoutes);
app.use("/api/movies", moviesRoutes);


// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT} in ${NODE_ENV} environment.`
  );

  await connectToDatabase();
});
