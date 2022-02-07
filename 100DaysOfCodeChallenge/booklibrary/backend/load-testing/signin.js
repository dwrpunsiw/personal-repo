import http from "k6/http";
import uuid from "./uuid.js";

const body = {
  username: "sojoey95",
  password: "password123",
  email: "sojoey95@gmail.com",
  firstname: "Wisnu",
  lastname: "Widianto",
  birthdate: "1995-01-29",
  location: {
    lat: "-6.924850",
    lng: "107.674900",
  },
};

export const options = {
  vus: 25,
  iterations: 1000,
  duration: "1m",
};

export default function () {
  let url = "http://localhost:3000/api/auth/signin";

  let params = {
    headers: {
      "Content-Type": "application/json",
      requestid: uuid.v4().toString(),
      touchpoint: "K6",
    },
  };

  var startTime = new Date();

  http.post(url, JSON.stringify(body), params);
}
