import { connectDatabase } from "./helpers/db";
import { app } from "./app";
import { green, red } from "colors";

const port = process.env.SERVICE_PORT || 3003;

const startApplication = async () => {
  const startTime = new Date();
  try {
    await connectDatabase();
    console.log(
      green(
        `[LIBRARY SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`
      )
    );
  } catch (error) {
    console.error(
      red(
        `[LIBRARY SERVICE][DATABASE CONNECT][UNSUCCESSFULLY CONNECT TO MONGODB]`
      )
    );
    process.exit();
  }
  app.listen(port, () => {
    const endTime = new Date();
    const startUpTIme = endTime.getTime() - startTime.getTime();
    console.log(
      green(
        `[LIBRARY SERVICE][START][LIBRARY SERVICE IS UP AND RUNNING ON PORT ${port}][START UP TIME ${startUpTIme} ms]`
      )
    );
  });
};

startApplication();
