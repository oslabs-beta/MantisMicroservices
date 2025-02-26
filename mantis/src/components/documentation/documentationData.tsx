import React from 'react';
import EcosystemImage from '../../assets/Ecosystem.png';

export const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis aggregates metrics—such as response times, latencies, error rates, and throughput—from your microservices and then forwards them to Prometheus (and optionally InfluxDB) for storage and Grafana for visualization. The result is a centralized dashboard that helps you quickly identify outages and performance bottlenecks.
        </p>
        
        <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Key Features</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li className="text-lg">
            <span className="font-medium text-white">API Gateway & Metrics Collector:</span> Acts as the entry point for all incoming requests, collecting data about each request before passing it on to the target microservice (or a Wiremock simulation).
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">Real-Time Monitoring:</span> Automatically scrapes and forwards metrics to Prometheus, where they can be queried or graphed by tools like Grafana.
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">User Management via MongoDB:</span> Stores user credentials (username/password) in MongoDB.
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">Integration with InfluxDB:</span> Per-user tokens are generated to store metrics in individual InfluxDB buckets for more granular analysis and historical storage.
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">Browser-Based Dashboard:</span> Offers real-time visualization of microservice performance (latency, error rates, throughput, etc.).
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">Dockerized Stack:</span> Run everything—Mantis, Prometheus, Grafana, and Wiremock—inside Docker containers for easy setup and deployment.
          </li>
          <li className="text-lg">
            <span className="font-medium text-white">Planned NPM Module:</span> Developers will be able to integrate Mantis directly into their Node.js microservices by installing it via npm install mantis.
          </li>
        </ul>
      </>
    )
  },
  {
    id: "system-architecture",
    title: "System Architecture",
    content: (
      <>
        <p className="text-lg mb-6">
          The Mantis ecosystem consists of several integrated components working together to provide comprehensive monitoring of your microservices.
        </p>
        
        <div className="flex justify-center my-8">
          <img 
            src={EcosystemImage} 
            alt="Mantis Ecosystem Diagram" 
            className="max-w-full rounded-lg shadow-lg border border-emerald-700"
          />
        </div>
        
        <p className="text-lg mb-6 text-emerald-200">
          The diagram above illustrates how all components of the Mantis ecosystem work together to provide comprehensive monitoring and visualization of your microservices.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Wiremock</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Simulates microservices for testing</p>
            <p><span className="font-medium text-white">Benefit:</span> Test without real microservices</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Mantis API Gateway</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Entry point for requests, collects metrics</p>
            <p><span className="font-medium text-white">Benefit:</span> Centralized monitoring</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Prometheus</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Stores time-series metrics</p>
            <p><span className="font-medium text-white">Benefit:</span> Powerful querying capabilities</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">InfluxDB</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Long-term metrics storage</p>
            <p><span className="font-medium text-white">Benefit:</span> Better for historical analysis</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Grafana</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Visualization platform</p>
            <p><span className="font-medium text-white">Benefit:</span> Interactive dashboards</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">MongoDB</h3>
            <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Stores user credentials</p>
            <p><span className="font-medium text-white">Benefit:</span> Secure authentication</p>
          </div>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
          <h3 className="text-xl font-semibold mb-3 text-emerald-400">Data Flow</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li className="text-lg">Client requests are routed through the Mantis API Gateway</li>
            <li className="text-lg">Mantis forwards requests to the target microservice (or Wiremock)</li>
            <li className="text-lg">Metrics are collected and sent to Prometheus and/or InfluxDB</li>
            <li className="text-lg">Grafana pulls data from these sources to create visualizations</li>
            <li className="text-lg">Users access the dashboard to monitor system performance</li>
          </ol>
        </div>
      </>
    )
  },
  {
    id: "installation",
    title: "Installation & Setup",
    content: (
      <>
        <p className="text-lg mb-6">
          Getting started with Mantis is straightforward using Docker Compose:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Prerequisites</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li className="text-lg">Docker and Docker Compose installed on your system</li>
            <li className="text-lg">Git for cloning the repository</li>
            <li className="text-lg">At least 4GB of RAM available for the containers</li>
          </ul>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Installation Steps</h3>
          <ol className="list-decimal list-inside space-y-4 ml-4">
            <li className="text-lg">
              <span className="font-medium text-white">Clone the repository:</span>
              <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                <code className="text-emerald-300">git clone https://github.com/your-org/mantis.git</code>
              </div>
            </li>
            <li className="text-lg">
              <span className="font-medium text-white">Navigate to the project directory:</span>
              <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                <code className="text-emerald-300">cd mantis</code>
              </div>
            </li>
            <li className="text-lg">
              <span className="font-medium text-white">Start the containers:</span>
              <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                <code className="text-emerald-300">docker-compose up -d</code>
              </div>
            </li>
            <li className="text-lg">
              <span className="font-medium text-white">Access the dashboard:</span>
              <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
                <code className="text-emerald-300">http://localhost:3000</code>
              </div>
            </li>
          </ol>
        </div>
      </>
    )
  },
  {
    id: "configuration",
    title: "Configuration",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis can be configured through environment variables or a configuration file:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Environment Variables</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-700">Variable</th>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-700">Description</th>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-700">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">PORT</td>
                  <td className="px-4 py-2 border-b border-gray-800">Port for the Mantis API Gateway</td>
                  <td className="px-4 py-2 border-b border-gray-800">3001</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">MONGODB_URI</td>
                  <td className="px-4 py-2 border-b border-gray-800">MongoDB connection string</td>
                  <td className="px-4 py-2 border-b border-gray-800">mongodb://localhost:27017/mantis</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">INFLUXDB_URL</td>
                  <td className="px-4 py-2 border-b border-gray-800">InfluxDB server URL</td>
                  <td className="px-4 py-2 border-b border-gray-800">http://localhost:8086</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">PROMETHEUS_URL</td>
                  <td className="px-4 py-2 border-b border-gray-800">Prometheus server URL</td>
                  <td className="px-4 py-2 border-b border-gray-800">http://localhost:9090</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">JWT_SECRET</td>
                  <td className="px-4 py-2 border-b border-gray-800">Secret for JWT token generation</td>
                  <td className="px-4 py-2 border-b border-gray-800">mantis_secret</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  },
  {
    id: "usage",
    title: "Usage",
    content: (
      <>
        <p className="text-lg mb-6">
          Once Mantis is up and running, you can use it to monitor your microservices:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Accessing the Dashboard</h3>
          <p className="mb-4">
            Open your browser and navigate to <code className="bg-gray-900 px-2 py-1 rounded">http://localhost:3000</code> to access the Mantis dashboard.
          </p>
          <p>
            Log in with the default credentials:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
            <li className="text-lg">Username: <code className="bg-gray-900 px-2 py-1 rounded">admin</code></li>
            <li className="text-lg">Password: <code className="bg-gray-900 px-2 py-1 rounded">mantis</code></li>
          </ul>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Routing Traffic Through Mantis</h3>
          <p className="mb-4">
            To monitor a microservice, route traffic through Mantis by changing your service's base URL:
          </p>
          <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto mb-4">
            <code className="text-emerald-300">
              // Instead of calling your service directly<br/>
              // const response = await fetch('http://your-service:8080/api/data');<br/><br/>
              
              // Route through Mantis<br/>
              const response = await fetch('http://mantis:3001/proxy/your-service/api/data');
            </code>
          </div>
          <p>
            Mantis will forward the request to your service and collect metrics about the request/response.
          </p>
        </div>
      </>
    )
  },
  {
    id: "wiremock",
    title: "Testing with Wiremock",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis includes Wiremock for simulating microservices during testing and development:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">What is Wiremock?</h3>
          <p>
            Wiremock is a simulator for HTTP-based APIs that allows you to stay productive when an API you depend on doesn't exist or isn't complete. It supports testing of edge cases and failure modes that the real API won't reliably produce.
          </p>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Creating Mock Endpoints</h3>
          <p className="mb-4">
            You can create mock endpoints by adding JSON files to the <code className="bg-gray-900 px-2 py-1 rounded">wiremock/mappings</code> directory:
          </p>
          <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
            <code className="text-emerald-300">
              {`{
  "request": {
    "method": "GET",
    "url": "/api/users"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "jsonBody": [
      { "id": 1, "name": "John Doe" },
      { "id": 2, "name": "Jane Smith" }
    ]
  }
}`}
            </code>
          </div>
        </div>
      </>
    )
  },
  {
    id: "contributing",
    title: "Contributing",
    content: (
      <>
        <p className="text-lg mb-6">
          We welcome contributions to the Mantis project! Here's how you can help:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Getting Started</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li className="text-lg">Fork the repository on GitHub</li>
            <li className="text-lg">Clone your fork locally</li>
            <li className="text-lg">Create a new branch for your feature or bugfix</li>
            <li className="text-lg">Make your changes</li>
            <li className="text-lg">Submit a pull request</li>
          </ol>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Development Setup</h3>
          <p className="mb-4">
            To set up the development environment:
          </p>
          <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto">
            <code className="text-emerald-300">
              # Install dependencies<br/>
              npm install<br/><br/>
              
              # Start the development server<br/>
              npm run dev
            </code>
          </div>
        </div>
      </>
    )
  },
  {
    id: "license",
    title: "License",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis is released under the MIT License, which allows for free use, modification, and distribution of the software.
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">MIT License</h3>
          <p className="mb-4">
            Copyright (c) 2025 Mantis Project
          </p>
          <p>
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files, to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge, publish, distribute, 
            sublicense, and/or sell copies of the Software.
          </p>
        </div>
      </>
    )
  }
]; 