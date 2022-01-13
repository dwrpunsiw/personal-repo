// Import Dependency
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";

// Import modules
import homeRoutes from "./routes/home";
import authRoutes from "./routes/auth";
import notFoundRoutes from "./routes/not-found";
import { errorHandler } from "./middlewares/error-handler";

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
app.use("/api", homeRoutes);
app.use(authRoutes);

// Not found routes
app.use(notFoundRoutes);
app.use(errorHandler);

export { app };
