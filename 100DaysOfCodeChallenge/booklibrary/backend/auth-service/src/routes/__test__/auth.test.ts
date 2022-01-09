import request from "supertest";
import { isAssertClause } from "typescript";
import { app } from "../../app";

// router.post("/api/auth/authenticate", authenticate);

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);
});

it("returns a 201 on successful signup and cookie", async () => {
  const res = await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("returns a 400 on missing field in request body on sign up", async () => {
  return request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      //   email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(400);
});

it("returns a 409, user already exists", async () => {
  await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(409);
});

it("returns a 201 on successful signin", async () => {
  await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signin")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
    })
    .expect(200);
});

it("returns a 201 on successful signin", async () => {
  await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/auth/signin")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("returns a 400 on missing field in request body on sign in", async () => {
  return request(app)
    .post("/api/auth/signin")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      //   password: "P@ssword123!",
    })
    .expect(400);
});

it("returns a 401 on signin with invalid credentials", async () => {
  await request(app)
    .post("/api/auth/signup")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signin")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .send({
      username: "wisnuprsj",
      password: "P@ssword",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(401);
});

it("returns a 205 on successful log out", async () => {
  const cookie = await signin();

  const res = await request(app)
    .post("/api/auth/signout")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .set("Cookie", cookie)
    .send({
      username: "wisnuprsj",
      password: "P@ssword123!",
      email: "wisnuprsj@gmail.com",
      firstname: "Wisnu",
      lastname: "Widianto",
      birthdate: "1995-01-29",
    })
    .expect(205);

  expect(res.get("Set-Cookie")).not.toBe(cookie);
});

it("returns a 200 on successfully authenticate", async () => {
  const cookie = await signin();

  await request(app)
    .post("/api/auth/authenticate")
    .set("requestid", "9f662698-3e95-4912-9143-2c2db4a1c591")
    .set("Cookie", cookie)
    .send({})
    .expect(200);
});
