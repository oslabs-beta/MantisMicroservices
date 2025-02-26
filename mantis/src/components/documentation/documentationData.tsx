import React from 'react';
import EcosystemImage from '../../assets/Ecosystem.png';

export const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis is a comprehensive microservice monitoring solution that provides real-time metrics, visualization, and intelligent traffic routing for your distributed applications.
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237] mb-6">
          <h3 className="text-xl font-semibold mb-3 text-emerald-400">Quick Start with NPM</h3>
          <p className="mb-4">Install our SDK directly into your Node.js applications:</p>
          <div className="bg-[#111827] rounded-md p-3 mb-2">
            <code className="text-gray-100 text-sm">npm install mantis-sdk</code>
          </div>
          <div className="bg-[#111827] rounded-md p-3 mb-2">
            <code className="text-gray-100 text-sm">const Mantis = require("mantis-sdk");</code>
          </div>
          <div className="bg-[#111827] rounded-md p-3">
            <code className="text-gray-100 text-sm">Mantis.start();</code>
          </div>
        </div>
        
        <p className="text-lg mb-6">
          With Mantis, you can monitor your microservices in real-time, visualize performance metrics, and make data-driven decisions to optimize your application's performance.
        </p>
      </>
    )
  },
  {
    id: "key-features",
    title: "Key Features",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis provides a lightweight, easy-to-integrate solution for monitoring your microservices directly in your browser.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Lightweight Integration</h3>
            <p>Simple NPM package installation with minimal configuration required to start monitoring your services.</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Real-time Monitoring</h3>
            <p>Track key performance metrics like response times, error rates, and request volumes as they happen.</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Browser-based Dashboard</h3>
            <p>Access all your metrics through an intuitive browser interface without additional tools.</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Intelligent Routing</h3>
            <p>Automatically route traffic based on service health and performance metrics.</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Service Simulation</h3>
            <p>Test your application with simulated microservices using the integrated Wiremock functionality.</p>
          </div>
          
          <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
            <h3 className="text-xl font-semibold mb-2 text-emerald-400">Customizable Alerts</h3>
            <p>Set thresholds and receive notifications when your services aren't performing as expected.</p>
          </div>
        </div>
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
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Core Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Mantis API Gateway</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Acts as an API Gateway, collecting and exposing metrics about incoming requests.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Serves as the main entry point for real-time data gathering, forwarding relevant metrics to Prometheus.</p>
              <p><span className="font-medium text-white">Benefit:</span> Centralized monitoring and traffic management.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Wiremock</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Simulates microservices for testing and development.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Provides mock responses based on predefined rules, allowing testing without real microservices.</p>
              <p><span className="font-medium text-white">Benefit:</span> Test without deploying actual microservices.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Prometheus</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Collects and stores time-series metrics data.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Scrapes metrics from Mantis and other services, optimized for real-time monitoring.</p>
              <p><span className="font-medium text-white">Benefit:</span> Powerful querying capabilities and real-time alerting.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">InfluxDB</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Long-term metrics storage with time-series optimization.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Provides native support for time windows, grouping by intervals, and retention policies with high write throughput.</p>
              <p><span className="font-medium text-white">Benefit:</span> Efficient storage and retrieval of API performance metrics.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Grafana</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Visualization platform for metrics.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Connects to InfluxDB and Prometheus as data sources, creating interactive dashboards.</p>
              <p><span className="font-medium text-white">Benefit:</span> Interactive dashboards and alerting capabilities.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">MongoDB</h4>
              <p className="mb-2"><span className="font-medium text-white">Purpose:</span> Stores user credentials and application configuration.</p>
              <p className="mb-2"><span className="font-medium text-white">Technical Details:</span> Provides flexible schema handling for dynamic data while maintaining simplicity.</p>
              <p><span className="font-medium text-white">Benefit:</span> Secure authentication and user-specific data storage.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237] mb-6">
          <h3 className="text-xl font-semibold mb-3 text-emerald-400">Data Flow</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li className="text-lg">Client requests are routed through the <span className="text-emerald-300">Mantis API Gateway</span></li>
            <li className="text-lg">The gateway forwards requests to the target microservice (or <span className="text-emerald-300">Wiremock</span> for simulated services)</li>
            <li className="text-lg">As requests are processed, the gateway collects performance metrics</li>
            <li className="text-lg">Metrics are sent to <span className="text-emerald-300">Prometheus</span> for immediate analysis and <span className="text-emerald-300">InfluxDB</span> for long-term storage</li>
            <li className="text-lg"><span className="text-emerald-300">Grafana</span> pulls data from these sources to create visualizations</li>
            <li className="text-lg">Users access the dashboard to monitor system performance and receive alerts</li>
            <li className="text-lg">User authentication is handled through <span className="text-emerald-300">MongoDB</span></li>
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