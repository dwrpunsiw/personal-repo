import { app } from "./app";

const port = process.env.AUTH_SERVICE_PORT || 3000;

const startApplication = () => {
  app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
  });
};

startApplication();
