import request from "supertest";
import { app } from "../../app";

it("return 201 on successfully insert kpi", async () => {
  return request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(201);
});

it("return 400 on missing requestId field in body request", async () => {
  // missing requestId
  await request(app)
    .post("/api/insertkpi")
    .send({
      //   requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing servicename field in body request", async () => {
  // missing servicename
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      //   servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing version field in body request", async () => {
  // missing version
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      //   version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing routes field in body request", async () => {
  // missing routes
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      //   routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing operationType field in body request", async () => {
  // missing operationType
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      //   operationType: "POST",
      completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing completion field in body request", async () => {
  // missing completion
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      //   completion: "SUCCESS",
      description: "Successfully sign up a new user",
    })
    .expect(400);
});

it("return 400 on missing description field in body request", async () => {
  // missing description
  await request(app)
    .post("/api/insertkpi")
    .send({
      requestId: "9f662698-3e95-4912-9143-2c2db4a1c591",
      servicename: "AUTH-SERVICE",
      version: "V1",
      routes: "/api/auth/signin",
      operationType: "POST",
      completion: "SUCCESS",
      //   description: "Successfully sign up a new user",
    })
    .expect(400);
});
