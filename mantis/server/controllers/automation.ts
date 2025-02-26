import axios from "axios";

// User credentials for automatic login
const userCredentials = {
  email: "test@gmail.com",
  password: "test", // Replace with the actual password
};

let userToken = ""; // Store token globally

// Function to log in and get a Bearer token
const loginAndStoreToken = async () => {
  try {
    console.log("Logging in as test@gmail.com...");

    const response = await axios.post("http://localhost:3001/api/login", userCredentials, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200 && response.data.token) {
      userToken = response.data.token; // Store the token globally
      console.log("✅ Successfully logged in! Token stored.");
    } else {
      console.error("❌ Failed to log in. Status:", response.status);
    }
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
  }
}

// Function to trigger `/trafficEndpoint` using stored token
const triggerEndpoint = async (endpoint) => {
  if (!userToken) {
    console.error("❌ No token available. Trying to log in...");
    await loginAndStoreToken(); // Re-login if no token is available
  }

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

// Export the functions to use them in `server/index.ts`
export { loginAndStoreToken, triggerEndpoint };
