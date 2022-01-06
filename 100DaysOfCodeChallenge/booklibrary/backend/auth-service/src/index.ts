import { DatabaseConnectionError } from "./models/exception/database-connection-error";
import { connectDatabase } from "./helpers/db";
import { app } from "./app";
import { green, red } from "colors";

const port = process.env.AUTH_SERVICE_PORT || 3000;

const startApplication = async () => {
  try {
    await connectDatabase();
    console.log(
      green(`[AUTH SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`)
    );
  } catch (error) {
    console.error(
      red(`[AUTH SERVICE][DATABASE CONNECT][UNSUCCESSFULLY CONNECT TO MONGODB]`)
    );
    throw new DatabaseConnectionError();
    process.exit();
  }
  app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
  });
};

startApplication();
