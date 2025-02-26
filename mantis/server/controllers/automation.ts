import axios from "axios";
import jwt from "jsonwebtoken";

const userCredentials = {
  email: "test@gmail.com",
  password: "test",
};

let userToken = ""; // Store token globally

// Function to check if JWT token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp < Math.floor(Date.now() / 1000);
  } catch (error) {
    return true;
  }
};

// Function to log in only if necessary
const loginAndStoreToken = async () => {
  if (userToken && !isTokenExpired(userToken)) {
    console.log("✅ Existing token is still valid:", userToken);
    return;
  }

  try {
    console.log("🔑 Logging in as test@gmail.com...");

    const response = await axios.post("http://localhost:3001/api/login", userCredentials, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200 && response.data.token) {
      console.log("🔄 Old Token:", userToken);
      userToken = response.data.token; // Store the new token
      console.log("✅ New Token Stored:", userToken);
    } else {
      console.error("❌ Failed to log in. Status:", response.status);
    }
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
  }
};

// Function to trigger `/trafficEndpoint` using stored token
const triggerEndpoint = async (endpoint) => {
    await loginAndStoreToken(); // Ensure the token is valid before making requests

    if (!userToken) {
      console.error("❌ No valid token available.");
      return;
    }
  
console.log(`🚀 Triggering ${endpoint} with token:`, userToken);
  try {
    console.log("Triggering /trafficEndpoint for /payment...");
    const response1 = await axios.get(`http://localhost:3001/api/trafficEndpoint?endpoint=/${endpoint}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const response2 = await axios.get(`http://localhost:3001/api/latencyp50?endpoint=/${endpoint}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const response3 = await axios.get(`http://localhost:3001/api/latencyp90?endpoint=/${endpoint}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const response4 = await axios.get(`http://localhost:3001/api/latencyp99?endpoint=/${endpoint}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const response5 = await axios.get(`http://localhost:3001/api/rps?endpoint=/${endpoint}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
    console.log("✅ Response:", response1.status, response2.status, response3.status, response4.status,response5.status);
  } catch (error) {
    console.error(`❌ Error triggering endpoint ${endpoint}:`, error.message);
    if (error.response && error.response.status === 401) {
      console.log("🔄 Token might be expired, logging in again...");
      await loginAndStoreToken(); // Re-login and retry
    }
  }
}

const triggerErrors = async (endpoint) => {
    await loginAndStoreToken(); // Ensure the token is valid before making requests

    if (!userToken) {
      console.error("❌ No valid token available.");
      return;
    }
  
console.log(`🚀 Triggering ${endpoint} with token:`, userToken);
  try {
    console.log(`Triggering erros for ${endpoint}...`);
    const response1 = await axios.get(`http://localhost:3001/api/erro4xx?endpoint=/${endpoint}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log("✅ Response:", response1.status);
  } catch (error) {
    console.error(`❌ Error triggering endpoint ${endpoint}:`, error.message);
    if (error.response && error.response.status === 401) {
      console.log("🔄 Token might be expired, logging in again...");
      await loginAndStoreToken(); // Re-login and retry
    }
  }
}


function generateModifier(endpoint: string): (val: number) => number {
    const hash = endpoint.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0); // Sum char codes
    const multiplier = (hash % 3) + 1.5; // Ensures a unique multiplier between 1.5 and 3.5
    const randomOffset = (hash % 5) + Math.random() * 5; // Ensures a unique offset between 0-10
    return (val: number) => val * multiplier + randomOffset;
  }

// Export the functions to use them in `server/index.ts`
export { loginAndStoreToken, triggerEndpoint, userToken, generateModifier, triggerErrors };
