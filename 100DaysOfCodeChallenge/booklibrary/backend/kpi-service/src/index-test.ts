import mongoose from "mongoose";
import { green, red } from "colors";
import { MongoMemoryServer } from "mongodb-memory-server";

import { app } from "./app";
import { connectDatabase } from "./helpers/db";
import { DatabaseConnectionError } from "./models/exception/database-connection-error";

const port = process.env.SERVICE_PORT || 3001;

const startApplication = async () => {
  try {
    let mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
    console.log(
      green(`[KPI SERVICE][DATABASE CONNECT][SUCCESSFULLY CONNECT TO MONGODB]`)
    );

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
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
