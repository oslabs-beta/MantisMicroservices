# Mantis: A Real-Time Microservice Monitoring Gateway

Mantis is an open-source API Gateway and monitoring solution designed to provide real-time observability into your microservice ecosystem. By collecting and visualizing metrics—such as response times, latency, throughput, and error rates—Mantis helps you quickly identify performance bottlenecks and application outages.

## Table of Contents

1. [Features](#features)  
2. [Architecture Overview](#architecture-overview)  
3. [Directory Structure](#directory-structure)  
4. [Installation & Setup](#installation--setup)  
5. [Usage](#usage)  
6. [Environment Variables](#environment-variables)  
7. [Testing](#testing)  
8. [Roadmap](#roadmap)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## Features

- **Real-Time Monitoring**  
  Collects key performance indicators (KPIs) for all incoming requests to your microservices, including response times, error rates, and throughput.

- **User-Friendly Dashboard**  
  Displays metrics in an intuitive browser-based interface for quick insight into microservice health. Powered by Grafana and seamlessly integrates with Prometheus and/or InfluxDB.

- **Lightweight Integration**  
  Offered as an npm package with optional Express.js middleware. Minimal setup required to start collecting metrics.

- **Testing Service Simulation**  
  Uses Wiremock to simulate traffic and endpoints, ensuring you can test Mantis without deploying your full microservice environment.

- **Scalable & Containerized**  
  Docker containers for each component (Mantis, Wiremock, Prometheus, Grafana, MongoDB, and InfluxDB). Lets you run everything locally or in production with minimal setup differences.

---

## Architecture Overview

Mantis is composed of the following main components and tools:

1. **Mantis (API Gateway + Monitoring Service)**  
   - Receives and routes traffic while capturing performance metrics in real time.
   - Exposes these metrics to Prometheus for scraping.
   - Forwards user-specific data to InfluxDB for long-term storage (if configured).

2. **Wiremock**  
   - Simulates microservices by providing mock endpoints.
   - Generates dummy traffic so you can test Mantis’s metrics collection in isolation.

3. **Prometheus**  
   - A time-series database that periodically scrapes Mantis for metrics.
   - Serves as a robust data source for real-time querying and alerting.

4. **InfluxDB**  
   - Stores application-specific or user-specific time-series data.
   - Integrates with Mantis via tokens for authenticated data persistence.

5. **MongoDB**  
   - Stores user credentials and session details.
   - Authenticates users and associates them with their respective InfluxDB tokens.

6. **Grafana**  
   - Connects to InfluxDB (and/or Prometheus) for interactive dashboards and visualization.
   - Allows you to create custom charts and alerts to monitor your microservices’ health.

7. **Docker**  
   - Containerizes the entire environment (Mantis, Wiremock, Prometheus, Grafana, MongoDB, and InfluxDB).
   - Simplifies local development and deployment on various platforms.

---

## Directory Structure

Below is an example of the project’s directory layout (as seen in `MANTIS_PROJECT`). You can tailor it to your needs:

```
MANTIS_PROJECT
├─ grafana_data/ # Grafana storage/data directory
├─ influx_data/ # InfluxDB storage/data directory
├─ influx_data_old/ # Old or backup Influx data
├─ loadMocking/ # Scripts or configs for simulating loads
├─ mongo_data/ # MongoDB storage/data directory
├─ monitoring/ # Monitoring configuration and components
├─ server/ # Server-side code
├─ src/ # Frontend source code
├─ wiremock/ # Wiremock config and stubs for service simulation
├─ .eslintrc.json # ESLint configuration
├─ .gitignore # Git ignore file
├─ create_influx_user.sh # Script for setting up InfluxDB users
├─ docker-compose.yml # Orchestrates containers for Mantis + supporting services
├─ extra_info.txt # Additional notes or documentation
├─ index.html # Main HTML entry point
├─ package-lock.json # Locked versions of dependencies
├─ package.json # Project dependencies and scripts
├─ prometheus.yml # Prometheus configuration
├─ README.md # Project documentation
├─ tailwind.config.js # Tailwind CSS configuration
├─ tsconfig.app.json # TypeScript configuration for app
├─ tsconfig.json # Main TypeScript configuration
├─ tsconfig.node.json # TypeScript configuration for Node.js
└─ vite.config.ts # Vite configuration
```

---

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/mantis.git
   cd mantis
   ```

2. **Install Dependencies**

   ```bash
   # From the root directory (where package.json resides)
   npm install
   ```

3. **Set Up Environment Variables**

   Be sure to configure any required environment variables. See the [Environment Variables](#environment-variables) section for details.

4. **Start Services via Docker Compose**  
   If you’re using the provided `docker-compose.yml`, simply run:

   ```bash
   docker-compose up --build
   ```

   This will bring up Mantis, Wiremock, Prometheus, Grafana, MongoDB, and InfluxDB in containers.

5. **Access the Dashboard**  
   - **Mantis** may be running on [http://localhost:3000](http://localhost:3000) (or another port, depending on your configuration).  
   - **Grafana** is typically on [http://localhost:3001](http://localhost:3001), but check your Docker Compose configuration.  
   - **Wiremock** endpoints might be at [http://localhost:8080](http://localhost:8080).

---

## Usage

### 1. Using the Express Middleware

In your existing Express.js application, install the Mantis npm package (example name: `mantis-sdk`), then add the middleware:

```js
import express from 'express';
import { mantisMiddleware } from 'mantis-sdk';

const app = express();

app.use(
  mantisMiddleware({
    apiKey: process.env.MANTIS_API_KEY,
    token: process.env.USER_OAUTH_TOKEN, // Optional
    authProvider: 'google', // or 'github'
  })
);

app.get('/', (req, res) => {
  res.send('Hello, Mantis!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 2. Sending Custom Metrics

If you need to programmatically send metrics (e.g., from a client application or custom logic), you can do:

```js
import MantisClient from 'mantis-sdk';

const client = new MantisClient({
  apiKey: process.env.MANTIS_API_KEY,
  token: process.env.USER_OAUTH_TOKEN,
  authProvider: 'github', // for example
});

client.sendMetric('requests_per_second', 5.3);
```

---

## Environment Variables

Here are some common variables you may need to configure for Mantis:

| Variable            | Description                                   | Default                                  |
|---------------------|-----------------------------------------------|------------------------------------------|
| **MANTIS_API_KEY**      | API key for authentication                   | None (Required)                          |
| **USER_OAUTH_TOKEN**    | OAuth token (if using OAuth)                | None                                     |
| **AUTH_PROVIDER**       | OAuth provider (e.g., `google`, `github`)   | None                                     |
| **MANTIS_API_URL**      | The API endpoint for the Mantis backend     | `https://mantis-backend.onrender.com`    |

Depending on your Docker setup, you may need to define these variables in a `.env` file or pass them directly in your Docker Compose config.

---

## Testing

Mantis includes Wiremock to simulate microservices. This allows you to:

1. **Generate Traffic** by calling mock endpoints under `/wiremock` (or whichever path you configured).
2. **Validate Metrics** in Grafana or Prometheus to confirm that Mantis is correctly capturing and forwarding data.
3. **Run Automated Tests** that do not depend on real microservices being deployed.

Example steps:
1. Spin up the Docker stack:  
   ```bash
   docker-compose up --build
   ```
2. Hit the Wiremock endpoint to simulate traffic:  
   ```bash
   curl http://localhost:8080/simulated-service
   ```
3. Observe metrics in Grafana or via Prometheus queries.

---

## Roadmap

We have several enhancements planned to expand Mantis’s functionality and improve user experience:

- **Testing Service Simulation (Dashboard Integration)**  
  Create and test mock services directly from the Mantis dashboard without deploying actual infrastructure.

- **Customizable Alerts**  
  Configure thresholds and receive notifications (email, Slack, etc.) when services perform below expectations.

- **Dynamic Custom Metrics**  
  Define and visualize custom metrics specific to your application’s needs.

- **Extended Docker Support**  
  Streamline the Docker setup and ensure that all components can be scaled independently.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements or bug fixes. Make sure to:

1. Fork the repository and create your branch from `main`.
2. Follow the project’s code style and testing guidelines.
3. Provide detailed commit messages and submit a well-described pull request.

---

## License

This project is open source under the [MIT License](./LICENSE). You are free to use, modify, and distribute this software, subject to the terms of the license.

---

**Thank you for using Mantis!** If you have any questions or run into any issues, feel free to open an issue or reach out through our [GitHub repository](https://github.com/yourusername/mantis). We look forward to your feedback and contributions.