// Import Dependency
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import cors from "cors";

// Import modules

// Initialize express
const app = express();

app.use(json());
app.use(cors());

// Routes

// Not found routes

export { app };
