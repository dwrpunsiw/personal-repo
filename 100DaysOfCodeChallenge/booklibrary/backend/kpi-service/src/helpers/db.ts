import mongoose from "mongoose";

export const connectDatabase = async () => {
  const connectionString = constructConnection(
    process.env.MONGODB_URI as string,
    process.env.MONGODB_USERNAME as string,
    process.env.MONGODB_PASSWORD as string
  );
  return mongoose.connect(connectionString);
};

function constructConnection(
  connectionString: string,
  username: string,
  password: string
) {
  connectionString = connectionString.replace("<username>", username);
  connectionString = connectionString.replace("<password>", password);
  return connectionString;
}
