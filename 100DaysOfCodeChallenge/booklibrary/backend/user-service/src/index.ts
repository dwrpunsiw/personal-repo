// Import modules
import { app } from "./app";
import { green } from "colors";

const port = process.env.SERVICE_PORT! || 3002;

const start = async () => {
  app.listen(port, () => {
    console.log(
      green(`
        [USER SERVICE][START][USER SERVICE IS UP AND RUNNING ON PORT ${port}]
        `)
    );
  });
};

start();
