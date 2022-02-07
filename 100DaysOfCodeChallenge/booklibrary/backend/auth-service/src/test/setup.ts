import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_SECRET = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
}, 50000);

global.signin = async () => {
  const res = await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .set("touchpoint", "UNIT TEST")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
      location: {
        lat: "-6.924850",
        lng: "107.674900",
      },
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  return cookie;
};
