// Import modules
import { DatabaseConnectionError } from "./models/exception/database-connection-error";
import { connectDatabase } from "./helpers/db";
import { app } from "./app";
import { green, red } from "colors";

const port = process.env.SERVICE_PORT! || 3002;

const startApplication = async () => {
  try {
    await connectDatabase();
    console.log(
      green(`[USER SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`)
    );
  } catch (error) {
    console.error(
      red(`[USER SERVICE][DATABASE CONNECT][UNSUCCESSFULLY CONNECT TO MONGODB]`)
    );
    throw new DatabaseConnectionError();
    process.exit();
  }
  app.listen(port, () => {
    console.log(
      green(
        `[USER SERVICE][START][USER SERVICE IS UP AND RUNNING ON PORT ${port}]`
      )
    );
  });
};

startApplication();
