import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // You can define multiple named scenarios
  scenarios: {
    // 1) "rpsScenario": ramp up to 5 VUs, hold, then ramp down
    rpsScenario: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "5s", target: 5 }, // ramp up to 5 VUs
        { duration: "20s", target: 5 }, // hold 5 VUs
        { duration: "5s", target: 0 }, // ramp down
      ],
      exec: "testRpsEndpoint", // the function name below
      tags: { scenario: "rps" },
    },
    // 2) "latencyScenario": constant 3 VUs for 30s
    latencyScenario: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "testLatencyEndpoint",
      tags: { scenario: "latency" },
    },

    error4xxScenario: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "testError4xxEndpoint",
      tags: { scenario: "error4xx" },
    },

    trafficPerEndpoint: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
      exec: "testTrafficEndpoint",
      tags: { scenario: "trafficPerEndpoint" },
    },

    // trafficPerEndpoint: {
    //   executor: "constant-vus",
    //   vus: 10,
    //   duration: "30s",
    //   exec: "testTrafficEndpoint",
    //   tags: { scenario: "trafficPerEndpoint" },
    // },

    // error5xxScenario: {
    //   executor: "constant-vus",
    //   vus: 10,
    //   duration: "30s",
    //   exec: "testError5xxEndpoint",
    //   tags: { scenario: "error5xx" },
    // },


  },
};

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

export function testRpsEndpoint() {
  // pick user based on VU number
  const user = users[__VU % users.length];

  // login
  const loginRes = http.post(
    "http://express-api:3001/login",
    JSON.stringify(user),
    { headers: { "Content-Type": "application/json" } }
  );
  check(loginRes, { "login successful": (r) => r.status === 200 });

  const token = loginRes.json("token");
  if (token) {
    // call /rps
    const rpsRes = http.get("http://express-api:3001/rps", {
      headers: { Authorization: `Bearer ${token}` },
    });
    check(rpsRes, { "rps request successful": (r) => r.status === 200 });
  }

  sleep(1); // wait 1s before next iteration
}

export function testLatency(params) {
  const user = users[__VU % users.length];

  // login
  const loginRes = http.post(
    "http://express-api:3001/login",
    JSON.stringify(user),
    { headers: { "Content-Type": "application/json" } }
  );
  check(loginRes, { "login successful": (r) => r.status === 200 });

  const token = loginRes.json("token");
  if (token) {
    // call /latencyp50
    const latRes = http.get(`http://express-api:3001/latencyp${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    check(latRes, {
      [`Latency ${params} request successful`]: (r) => r.status === 200,
    });
  }

  sleep(1);
}

export function testLatencyEndpoint() {
  testLatency("50");
  testLatency("90");
  testLatency("99");
  sleep(1);
}

export function testError4xx(error, params) {
  // pick user based on VU number
  const user = users[__VU % users.length];

  // login
  const loginRes = http.post(
    "http://express-api:3001/login",
    JSON.stringify(user),
    { headers: { "Content-Type": "application/json" } }
  );
  check(loginRes, { "login successful": (r) => r.status === 200 });

  const token = loginRes.json("token");
  if (token) {
    // call /rps
    for (let i = 0; i < params; i++) {
      const res = http.get(
        `http://express-api:3001/error4xx?endpoint=test${error}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      check(res, {
        "4xx request triggered": (r) => r.status >= 400 && r.status < 500,
      });
    }
    sleep(1); // wait 1s before next iteration
  }
}

export function testError4xxEndpoint() {
  testError4xx(400, 2);
  testError4xx(401, 6);
  testError4xx(403, 4);
  testError4xx(404, 5);
  testError4xx(405, 3);

  sleep(1);
}

export function testTraffic(endpoint, params) {
  // pick user based on VU number
  const user = users[__VU % users.length];

  // login
  const loginRes = http.post(
    "http://express-api:3001/login",
    JSON.stringify(user),
    { headers: { "Content-Type": "application/json" } }
  );
  check(loginRes, { "login successful": (r) => r.status === 200 });

  const token = loginRes.json("token");
  if (token) {
    // call /rps
    for (let i = 0; i < params; i++) {
      const res = http.get(
        `http://express-api:3001/trafficEndpoint?endpoint=/${endpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      check(res, {
        "Traffic per Endpoint request triggered": (r) => r.status === 200,
      });
    }
    sleep(1); // wait 1s before next iteration
  }
}

export function testTrafficEndpoint() {
  testTraffic("order", 10);
  testTraffic("payment", 6);
  testTraffic("user", 4);
  testTraffic("travel", 5);

  sleep(1);
}

