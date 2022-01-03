// Import Dependency
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import cors from "cors";

// Import modules
import homeRoutes from "./routes/home";
import kpiRoutes from "./routes/kpi-routes";
import notFoundRoutes from "./routes/not-found";
import { errorHandler } from "./middlewares/error-handler";

// Initialize express
const app = express();

app.use(json());
app.use(cors());

// Routes
app.use("/api", homeRoutes);
app.use(kpiRoutes);

// Not found routes
app.use(notFoundRoutes);
app.use(errorHandler);

export { app };
