import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 3,  // Number of virtual users (simulating different users)
  duration: "30s",
};

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

export default function () {
  const user = users[__VU % users.length]; // Assign users based on VU index

  const loginRes = http.post("http://express-api:3001/login", JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });

  check(loginRes, {
    "login successful": (res) => res.status === 200,
  });

  const token = loginRes.json("token"); // Extract token from response

  if (token) {
    const orderServices = http.get("http://wiremock:8080/order-services", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const paymentServices = http.get("http://wiremock:8080/payment-services", {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(orderServices, {
      "rps request successful": (res) => res.status === 200,
    });

    check(paymentServices, {
      "p50 request successful": (res) => res.status === 200,
    });

  }

  sleep(1);
}

// import http from "k6/http";
// import { check, sleep } from "k6";

// export let options = {
//   scenarios: {
//     nameOfEndpoint: {
//       executor: "constant-arrival-rate",
//       rate: 4,  // 4 requests per second
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 10,
//       maxVUs: 20,
//     },
//     endpoint2: {
//       executor: "constant-arrival-rate",
//       rate: 10, // 10 requests per second
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 10,
//       maxVUs: 20,
//     },
//     get_mocking1: {
//       executor: "constant-arrival-rate",
//       rate: 7,
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 6,
//       maxVUs: 10,
//     }
//   },
// };

// export default function () {
//   let res;

//   // Distribute traffic by scenario
//   if (__ENV.SCENARIO === "order-services") {
//     res = http.get("http://wiremock:8080/order-services");
//   } else if (__ENV.SCENARIO === "get_main") {
//     res = http.get("http://express-api:3001/get-main");
//   } else if (__ENV.SCENARIO === "get_mocking1") {
//     res = http.get("http://express-api:3001/get-mocking1");
//   }

//   check(res, {
//     "is status 200": (r) => r.status === 200,
//   });

//   sleep(1);
// }