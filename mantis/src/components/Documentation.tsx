import React from 'react';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f2922] text-gray-200 p-8 relative">
      {/* Animated background */}
      <div className="wave-background absolute inset-0 overflow-hidden -z-10">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <header className="mb-8 max-w-5xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold mb-2 text-white">Mantis Documentation</h1>
        <p className="text-xl text-gray-300">
          An open-source API Gateway microservice designed to provide real-time monitoring and visualization of application health and performance.
        </p>
        <nav className="mt-4">
          <Link to="/" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
            Back to Home
          </Link>
        </nav>
      </header>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <section className="mb-8 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-3 text-white">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li>
              <a href="#overview" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Overview
              </a>
            </li>
            <li>
              <a href="#system-architecture" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                System Architecture
              </a>
            </li>
            <li>
              <a href="#installation" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Installation & Setup
              </a>
            </li>
            <li>
              <a href="#configuration" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Configuration
              </a>
            </li>
            <li>
              <a href="#usage" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Usage
              </a>
            </li>
            <li>
              <a href="#wiremock" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Testing with Wiremock
              </a>
            </li>
            <li>
              <a href="#contributing" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Contributing
              </a>
            </li>
            <li>
              <a href="#license" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                License
              </a>
            </li>
          </ol>
        </section>
        
        <section id="overview" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Overview</h2>
          <p className="text-lg mb-6 text-gray-300">
            Mantis aggregates metrics—such as response times, latencies, error rates, and throughput—from your microservices and then forwards them to Prometheus (and optionally InfluxDB) for storage and Grafana for visualization. The result is a centralized dashboard that helps you quickly identify outages and performance bottlenecks.
          </p>
          
          <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
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
        </section>
        
        <section id="system-architecture" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">System Architecture</h2>
          <p className="text-lg mb-6 text-gray-300">
            The Mantis ecosystem is composed of the following services and tools:
          </p>
          
          <div className="space-y-6">
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">Wiremock (running in Docker)</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span> Simulates one or more microservices by returning mock endpoints and generating dummy traffic so you can test Mantis without a real microservice environment.</p>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Enables you to quickly evaluate Mantis's monitoring features without risking a production system.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">Mantis (our application)</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span></p>
              <ul className="list-disc list-inside ml-4 mb-2 text-gray-300">
                <li>Acts as an API Gateway that receives traffic from either real services or Wiremock.</li>
                <li>Collects, transforms, and exposes metrics on incoming requests.</li>
                <li>Forwards metrics to Prometheus for real-time scraping.</li>
              </ul>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Centralizes data about request volume, latency, and errors in one place for analysis.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">Prometheus</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span></p>
              <ul className="list-disc list-inside ml-4 mb-2 text-gray-300">
                <li>Scrapes Mantis for metrics.</li>
                <li>Stores these metrics in its built-in time-series database.</li>
              </ul>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Provides an endpoint for data visualization tools and can also trigger alerts on anomaly detection.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">InfluxDB</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span> Receives microservice data from Mantis (and Prometheus) for specialized time-series storage. Each user can have a dedicated "bucket" in InfluxDB, keyed by a token.</p>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Allows long-term storage, custom retention policies, and advanced querying via InfluxQL.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">MongoDB</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span> Stores user account information. A new MongoDB record is created whenever a user signs up within Mantis; credentials are verified at login.</p>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Simple, flexible data model for user logins, letting each user link to a unique InfluxDB bucket.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">Grafana</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span> Connects to InfluxDB (or Prometheus) as a data source and offers robust, customizable dashboards for microservice metrics.</p>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Allows you to visualize real-time performance metrics and define alerting rules (e.g., if latency exceeds a threshold).</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">Docker</h3>
              <p className="mb-2 text-gray-300"><span className="font-medium text-white">Purpose:</span> Containerizes Wiremock, Mantis, Prometheus, and Grafana for easy deployment and environment parity.</p>
              <p className="text-gray-300"><span className="font-medium text-white">Benefit:</span> Simplifies your entire monitoring stack's setup, ensuring each component is isolated and can scale independently.</p>
            </div>
            
            <div className="bg-[#0f2922] p-6 rounded-lg shadow-md border border-[#164237]">
              <h3 className="text-xl font-semibold mb-2 text-emerald-400">NPM Package (Future)</h3>
              <p className="text-gray-300"><span className="font-medium text-white">Goal:</span> Provide Mantis as an installable Node.js module (e.g. npm install mantis) so that existing applications can embed Mantis's functionality with minimal configuration.</p>
            </div>
          </div>
        </section>
        
        <section id="installation" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Installation & Setup</h2>
          
          <h3 className="text-2xl font-semibold mb-3 text-emerald-400">Running with Docker</h3>
          <p className="text-lg mb-4 text-gray-300">
            For the simplest and most reproducible experience, we recommend running the entire Mantis stack within Docker containers.
          </p>
          
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-xl font-medium mb-2 text-white">Clone the Mantis Repository</h4>
              <pre className="bg-[#0f2922] text-gray-100 p-4 rounded overflow-x-auto border border-[#164237]">
                <code>git clone https://github.com/your-org/mantis.git
cd mantis</code>
              </pre>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-2 text-white">Edit Environment Variables (Optional)</h4>
              <p className="text-gray-300">In the repository, find <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">.env</code> or <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">docker-compose.yml</code> to adjust settings like port numbers, default credentials, or retention policies if needed.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-2 text-white">Start the Docker Containers</h4>
              <pre className="bg-[#0f2922] text-gray-100 p-4 rounded overflow-x-auto border border-[#164237]">
                <code>docker-compose up --build</code>
              </pre>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-2 text-white">Verify Mantis is Running</h4>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li>Mantis typically listens on port 3000 (or whatever you configured).</li>
                <li>Navigate to <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">http://localhost:3000</code> to confirm it's operational.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-medium mb-2 text-white">Access Grafana</h4>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li>By default, Grafana is available at <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">http://localhost:3001</code>.</li>
                <li>Login with the default credentials (often admin/admin) or whatever you've customized.</li>
                <li>Add InfluxDB or Prometheus as a data source (some Docker setups add this automatically).</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-3 text-emerald-400">NPM Package</h3>
          <p className="text-lg mb-4 text-gray-300">
            You can also install Mantis directly via npm:
          </p>
          
          <pre className="bg-[#0f2922] text-gray-100 p-4 rounded overflow-x-auto mb-4 border border-[#164237]">
            <code>npm install mantis-sdk

# Then in your code:
const Mantis = require("mantis-sdk");
Mantis.start({ /* config options */ });</code>
          </pre>
          
          <p className="text-lg text-gray-300">
            This will spin up Mantis as a local service so you can seamlessly integrate its monitoring tools into an existing microservices application.
          </p>
        </section>
        
        <section id="configuration" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Configuration</h2>
          <p className="text-lg mb-4 text-gray-300">
            Depending on how you deploy Mantis (Docker vs. direct Node.js), you have a few common configuration points:
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4 mb-6 text-gray-300">
            <li className="text-lg"><code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">MONGODB_URI</code>: The connection string to your MongoDB instance for user account storage.</li>
            <li className="text-lg"><code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">INFLUXDB_URL / INFLUXDB_TOKEN</code>: The connection details for InfluxDB. Mantis will use this to create user-specific buckets.</li>
            <li className="text-lg"><code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">PROMETHEUS_SCRAPE_ENDPOINT</code>: (If needed) Where Prometheus scrapes Mantis metrics. Usually <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">http://mantis:3000/metrics</code>.</li>
            <li className="text-lg"><code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">PORT</code>: The port on which Mantis listens for incoming traffic (default: 3000).</li>
            <li className="text-lg"><code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">GRAFANA_URL</code>: (Optional) If you want Mantis or front-end code to link out directly to Grafana dashboards.</li>
          </ul>
          
          <p className="text-lg text-gray-300">
            In Docker deployments, these settings typically live in the <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">docker-compose.yml</code> or <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">.env</code> file. For direct Node.js usage, you can either set environment variables or pass them in as configuration options to <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">Mantis.start()</code>.
          </p>
        </section>
        
        <section id="usage" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Usage</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Sending Traffic Through Mantis</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">Mantis functions as an API Gateway: simply point your client or microservices to <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">http://&lt;mantis_host&gt;:3000/&lt;your-service-route&gt;</code>.</li>
                <li className="text-lg">Mantis forwards the request to the real service (or a Wiremock simulator), capturing metrics along the way.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Scraping Metrics</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">By default, Prometheus automatically scrapes Mantis at <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">/metrics</code>.</li>
                <li className="text-lg">You can verify or tweak scrape intervals in your Prometheus config file (within Docker: <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">prometheus.yml</code>).</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Viewing Dashboards in Grafana</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">Open Grafana at the published port (often 3001).</li>
                <li className="text-lg">Explore the default dashboards or create custom ones.</li>
                <li className="text-lg">Connect either Prometheus or InfluxDB as a data source. For user-scoped data in InfluxDB, you'll use the tokens Mantis generates.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Managing Users (MongoDB)</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">When a new user signs up, Mantis stores credentials in MongoDB.</li>
                <li className="text-lg">If you have InfluxDB integration enabled, Mantis automatically creates a dedicated InfluxDB bucket for that user, using a newly generated token.</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section id="wiremock" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Testing with Wiremock</h2>
          <p className="text-lg mb-4 text-gray-300">
            One of Mantis's strengths is that you don't need real microservices to see how it performs. Using Wiremock running in Docker:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Enable Test Mode</h3>
              <p className="text-lg text-gray-300">Ensure that your Docker setup includes the Wiremock container.</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Simulate Requests</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">From Mantis's UI (or any test client), send traffic to endpoints that route to Wiremock (e.g. <code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">http://localhost:3000/wiremock/user/123</code>).</li>
                <li className="text-lg">Wiremock will respond with mock data, and Mantis will collect the request/response metrics.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-emerald-400">Generate Load with K6 (Optional)</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li className="text-lg">Use k6 (bundled in the Docker stack or installed locally) to stress-test Mantis endpoints.</li>
                <li className="text-lg">This helps you see how Mantis handles high-volume traffic and whether your metrics pipeline can scale.</li>
              </ul>
            </div>
          </div>
          
          <p className="text-lg mt-4 text-gray-300">
            In the front-end, you can set up a button or test scenario that sends a burst of traffic to Wiremock via Mantis. Watch your Grafana dashboards to see the spike in requests, latency changes, etc.
          </p>
        </section>
        
        <section id="contributing" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">Contributing</h2>
          <p className="text-lg mb-4 text-gray-300">
            Mantis is an open-source project under active development, and contributions are welcome! To contribute:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 ml-4 mb-6 text-gray-300">
            <li className="text-lg">Fork the Repository on GitHub.</li>
            <li className="text-lg">Create a Feature Branch for any bug fix or new feature (<code className="bg-[#0f2922] px-1 py-0.5 rounded text-emerald-300 border border-[#164237]">git checkout -b feature/my-new-idea</code>).</li>
            <li className="text-lg">Add Tests (Unit tests in Jest or integration tests with K6) where applicable.</li>
            <li className="text-lg">Submit a Pull Request detailing your changes.</li>
          </ol>
          
          <p className="text-lg text-gray-300">
            Join the Discussion: If you're tackling a large or complex feature, open an issue first to get feedback on design and approach.
          </p>
          <p className="text-lg text-gray-300">
            We also welcome feedback on documentation, architecture, or any other suggestions in the GitHub Issues.
          </p>
        </section>
        
        <section id="license" className="mb-12 bg-[#0a1e19] bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-[#164237]">
          <h2 className="text-3xl font-semibold mb-4 border-b border-[#164237] pb-2 text-white">License</h2>
          <p className="text-lg text-gray-300">
            Mantis is released under the MIT License. For more information, please see the LICENSE file in the repository.
          </p>
        </section>
        
        <div className="bg-[#0a1e19] border border-emerald-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-emerald-400">Upcoming Features</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-emerald-200">
            <li className="text-lg">In-browser microservice testing - Test your microservices directly in the browser without additional tools</li>
            <li className="text-lg">Enhanced real-time analytics with customizable alert thresholds</li>
            <li className="text-lg">Expanded visualization options for complex microservice architectures</li>
          </ul>
          <p className="text-lg mt-4 font-medium text-emerald-300">Stay tuned for these exciting updates!</p>
        </div>
        
        <div className="bg-[#0a1e19] border border-emerald-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-emerald-400">Ready to Get Started?</h2>
          <p className="text-lg mb-4 text-emerald-200">
            You now have Mantis up and running. You can simulate microservices, collect real-time metrics, store them in Prometheus/InfluxDB, and visualize everything in Grafana.
          </p>
          <p className="text-lg font-medium text-emerald-300">Happy monitoring!</p>
        </div>
      </div>
      
      <footer className="mt-16 pt-8 border-t border-[#164237] text-center text-gray-400 relative z-10">
        <div className="max-w-5xl mx-auto">
          <p>© 2023 Mantis Project. Released under the MIT License.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="https://github.com/your-org/mantis" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">GitHub</a>
            <a href="#" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">Contact</a>
            <a href="#" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;