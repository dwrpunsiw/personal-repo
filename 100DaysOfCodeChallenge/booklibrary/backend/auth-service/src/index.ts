import { connectDatabase } from "@wpw-library/common";
import { app } from "./app";
import { green, red } from "colors";

const port = process.env.SERVICE_PORT || 3000;

const startApplication = async () => {
  const startTime = new Date();
  try {
    await connectDatabase();
    console.log(
      green(`[AUTH SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`)
    );
  } catch (error) {
    console.error(
      red(`[AUTH SERVICE][DATABASE CONNECT][UNSUCCESSFULLY CONNECT TO MONGODB]`)
    );
    process.exit();
  }
  app.listen(port, () => {
    const endTime = new Date();
    const startUpTIme = endTime.getTime() - startTime.getTime();
    console.log(
      green(
        `[AUTH SERVICE][START][AUTH SERVICE IS UP AND RUNNING ON PORT ${port}][START UP TIME ${startUpTIme} ms]`
      )
    );
  });
};

startApplication();
