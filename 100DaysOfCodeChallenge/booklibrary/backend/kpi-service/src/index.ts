import { green, red } from "colors";

import { app } from "./app";
import { connectDatabase } from "./helpers/db";
import { DatabaseConnectionError } from "./models/exception/database-connection-error";

const port = process.env.SERVICE_PORT || 3001;

const startApplication = async () => {
  try {
    await connectDatabase();
    console.log(
      green(`[KPI SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`)
    );
  } catch (error) {
    console.error(
      red(`[KPI SERVICE][DATABASE CONNECT][UNSUCCESSFULLY CONNECT TO MONGODB]`)
    );
    throw new DatabaseConnectionError();
    process.exit();
  }

  app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
  });
};

startApplication();
