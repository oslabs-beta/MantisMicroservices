import React, { useState } from 'react';
import EcosystemImage from '../../assets/Ecosystem.png';

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <button 
      className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={handleCopy}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};

export const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p className="text-lg mb-6">
          Mantis is a comprehensive microservice monitoring solution that provides real-time metrics, visualization, and intelligent traffic routing for your distributed applications.
        </p>
        
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
              <p>Routes traffic intelligently while collecting performance metrics to optimize microservice distribution.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Wiremock</h4>
              <p>Simulates microservices for testing without deploying actual infrastructure.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Prometheus</h4>
              <p>Stores time-series metrics with powerful querying for real-time monitoring.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">InfluxDB</h4>
              <p>Provides high-performance storage optimized for time-series metrics data.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">Grafana</h4>
              <p>Creates interactive dashboards for comprehensive visualization of microservice performance.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h4 className="text-xl font-semibold mb-2 text-emerald-400">MongoDB</h4>
              <p>Stores user credentials and configuration with flexible schema handling.</p>
            </div>
          </div>
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
          Getting started with Mantis is straightforward using our NPM package:
        </p>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">NPM Package Usage</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-emerald-300">1. Client-Based Metric Tracking</h4>
            <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto relative group">
              <CopyButton code={`import MantisClient from 'mantis-sdk';

const client = new MantisClient({
  apiKey: process.env.MANTIS_API_KEY,
  token: process.env.USER_OAUTH_TOKEN, // Optional
  authProvider: 'google', // or 'github'
});

client.sendMetric('requests_per_second', 5.3);`} />
              <pre className="font-mono text-sm">
                <span className="text-blue-400">import</span> <span className="text-yellow-300">MantisClient</span> <span className="text-blue-400">from</span> <span className="text-green-300">'mantis-sdk'</span>;<br/><br/>
                
                <span className="text-blue-400">const</span> <span className="text-yellow-300">client</span> = <span className="text-blue-400">new</span> <span className="text-yellow-300">MantisClient</span>(&#123;<br/>
                &nbsp;&nbsp;<span className="text-purple-300">apiKey</span>: <span className="text-yellow-300">process.env</span>.<span className="text-yellow-300">MANTIS_API_KEY</span>,<br/>
                &nbsp;&nbsp;<span className="text-purple-300">token</span>: <span className="text-yellow-300">process.env</span>.<span className="text-yellow-300">USER_OAUTH_TOKEN</span>, <span className="text-gray-500">// Optional</span><br/>
                &nbsp;&nbsp;<span className="text-purple-300">authProvider</span>: <span className="text-green-300">'google'</span>, <span className="text-gray-500">// or 'github'</span><br/>
                &#125;);<br/><br/>
                
                <span className="text-yellow-300">client</span>.<span className="text-blue-300">sendMetric</span>(<span className="text-green-300">'requests_per_second'</span>, <span className="text-orange-300">5.3</span>);
              </pre>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2 text-emerald-300">2. Express Middleware for Automatic Tracking</h4>
            <div className="bg-gray-900 p-3 rounded-md mt-2 overflow-x-auto relative group">
              <CopyButton code={`import express from 'express';
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

app.listen(3000, () => console.log('Server running on port 3000'));`} />
              <pre className="font-mono text-sm">
                <span className="text-blue-400">import</span> <span className="text-yellow-300">express</span> <span className="text-blue-400">from</span> <span className="text-green-300">'express'</span>;<br/>
                <span className="text-blue-400">import</span> &#123; <span className="text-yellow-300">mantisMiddleware</span> &#125; <span className="text-blue-400">from</span> <span className="text-green-300">'mantis-sdk'</span>;<br/><br/>
                
                <span className="text-blue-400">const</span> <span className="text-yellow-300">app</span> = <span className="text-yellow-300">express</span>();<br/><br/>
                
                <span className="text-yellow-300">app</span>.<span className="text-blue-300">use</span>(<br/>
                &nbsp;&nbsp;<span className="text-yellow-300">mantisMiddleware</span>(&#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">apiKey</span>: <span className="text-yellow-300">process.env</span>.<span className="text-yellow-300">MANTIS_API_KEY</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">token</span>: <span className="text-yellow-300">process.env</span>.<span className="text-yellow-300">USER_OAUTH_TOKEN</span>, <span className="text-gray-500">// Optional</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-300">authProvider</span>: <span className="text-green-300">'google'</span>, <span className="text-gray-500">// or 'github'</span><br/>
                &nbsp;&nbsp;&#125;)<br/>
                );<br/><br/>
                
                <span className="text-yellow-300">app</span>.<span className="text-blue-300">get</span>(<span className="text-green-300">'/'</span>, (<span className="text-orange-300">req</span>, <span className="text-orange-300">res</span>) =&gt; &#123;<br/>
                &nbsp;&nbsp;<span className="text-orange-300">res</span>.<span className="text-blue-300">send</span>(<span className="text-green-300">'Hello, Mantis!'</span>);<br/>
                &#125;);<br/><br/>
                
                <span className="text-yellow-300">app</span>.<span className="text-blue-300">listen</span>(<span className="text-orange-300">3000</span>, () =&gt; <span className="text-yellow-300">console</span>.<span className="text-blue-300">log</span>(<span className="text-green-300">'Server running on port 3000'</span>));
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0f2922] p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Environment Configuration</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-md">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-800">Variable</th>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-800">Description</th>
                  <th className="px-4 py-2 text-left text-emerald-400 border-b border-gray-800">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">MANTIS_API_KEY</td>
                  <td className="px-4 py-2 border-b border-gray-800">API key for authentication</td>
                  <td className="px-4 py-2 border-b border-gray-800">None (Required)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">USER_OAUTH_TOKEN</td>
                  <td className="px-4 py-2 border-b border-gray-800">OAuth token (if using OAuth)</td>
                  <td className="px-4 py-2 border-b border-gray-800">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">AUTH_PROVIDER</td>
                  <td className="px-4 py-2 border-b border-gray-800">OAuth provider</td>
                  <td className="px-4 py-2 border-b border-gray-800">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-800 font-mono text-sm">MANTIS_API_URL</td>
                  <td className="px-4 py-2 border-b border-gray-800">API endpoint</td>
                  <td className="px-4 py-2 border-b border-gray-800">https://mantis-backend.onrender.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  },
  {
    id: "future-roadmap",
    title: "Future Roadmap",
    content: (
      <>
        <p className="text-lg mb-6">
          We're actively developing new features for Mantis to enhance your microservice monitoring experience.
        </p>
        
        <div className="bg-[#0f2922] p-8 rounded-lg mb-6 border border-[#164237] shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Coming Soon</h3>
          
          <ul className="space-y-5 ml-2">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-1">
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-medium text-emerald-300">Testing Service Simulation</span>
                <p className="mt-1 text-gray-300">Create and test mock services directly in the dashboard without deploying actual microservices.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-1">
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-medium text-emerald-300">Customizable Alerts</span>
                <p className="mt-1 text-gray-300">Set thresholds and receive notifications when services aren't performing as expected.</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-1">
                <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-medium text-emerald-300">Dynamic Custom Metrics</span>
                <p className="mt-1 text-gray-300">Access and visualize custom metrics specific to your application needs.</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 text-sm text-gray-400">
            <p>
              Note: Docker with at least 4GB of RAM is recommended for development and testing.
            </p>
          </div>
        </div>
      </>
    )
  }
];

