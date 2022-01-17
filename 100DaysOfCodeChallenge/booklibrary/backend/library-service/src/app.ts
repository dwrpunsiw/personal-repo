// Import Dependency
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";

// Import modules
import notFoundRoutes from "./routes/not-found";
import libraryRoutes from "./routes/library";
import { errorHandler } from "@wpw-library/common";

// Initialize express
const app = express();

app.set("trust proxy", true); // trust first proxy

app.use(json());
app.use(cors());

app.use(
  cookieSession({
    signed: process.env.NODE_ENV !== "Development",
    secret: process.env.SESSION_SECRET,
    secure: process.env.NODE_ENV !== "Development",
  })
);

// Routes
app.use(libraryRoutes);

// Not found routes
app.use(notFoundRoutes);
app.use(errorHandler);

export { app };
