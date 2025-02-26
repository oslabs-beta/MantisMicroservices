import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';

interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
  influxToken: string;
  bucket: string;
}

interface DashboardProps {
  loggedInUser?: LoggedInUser;
}

const Dashboard: React.FC<DashboardProps> = ({ loggedInUser }) => {
  const [viewType, setViewType] = useState('Overview');
  const [timeFrame, setTimeFrame] = useState('1h');
  const [activeTab, setActiveTab] = useState(0);
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Force refresh of iframes
  const [showDetailTabs, setShowDetailTabs] = useState(false);

  // Use the bucket from user data
  const userBucket = loggedInUser?.bucket || 'bucket_test';

  // Fetch available endpoints when the component mounts
  useEffect(() => {
    const fetchEndpoints = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/endpoints', {
          headers: {
            'Authorization': `Bearer ${loggedInUser?.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch endpoints: ${response.statusText}`);
        }
        
        const data = await response.json();
        setEndpoints(data.endpoints);
        if (data.endpoints.length > 0) {
          setSelectedEndpoint(data.endpoints[0]); // Select the first endpoint by default
        }
      } catch (err) {
        console.error('Error fetching endpoints:', err);
        setError('Failed to load endpoints. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedInUser?.token) {
      fetchEndpoints();
    }
  }, [loggedInUser?.token]);

  // Tab data with corresponding measurement values
  const tabData = [
    { label: 'Overview', measurement: '' },
    { label: 'P50', measurement: 'p50_latency', field: 'p50' },
    { label: 'P90', measurement: 'p90_latency', field: 'p90' },
    { label: 'P99', measurement: 'p99_latency', field: 'p99' },
    // { label: 'Error Rate 500', measurement: 'error_5xx', field: 'count' },
    { label: 'Error Rate 400', measurement: 'error_4xx', field: 'count' },
    { label: 'rps', measurement: 'rps', field: 'rps' },
    { label: 'Traffic per endpoint', measurement: 'traffic', field: 'count' },
  ];

  // Update viewType and active tab on tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setViewType(tabData[index].label);
    setRefreshKey(prev => prev + 1); // Force iframe refresh
  };

  // Update time frame
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
    setRefreshKey(prev => prev + 1); // Force iframe refresh
  };

  // Handle endpoint selection
  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndpoint(e.target.value);
    setRefreshKey(prev => prev + 1); // Force iframe refresh
  };

  // Hardcoded iframe URLs for each panel
  const iframeUrls = {
    // Overview panel iframes
    overview: {
      latency: "http://localhost:3000/d-solo/dee5d7b3eom4ge/new-dashboard?orgId=1&timezone=browser&var-query0=&editIndex=0&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
      rps: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=rps&var-field=rps&var-endpoints=%2Forder&panelId=1&__feature.dashboardSceneSolo",
      traffic: "http://localhost:3000/d-solo/bee6ekhh16dq8c/trafficpere?orgId=1&timezone=browser&tab=queries&panelId=1&__feature.dashboardSceneSolo"
      traffic: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=traffic&var-field=count&var-endpoint=%2Fpayment&panelId=4&_feature.dashboardSceneSolo=true",
      error400: "http://localhost:3000/d-solo/bee5sivy2wfeod/errors4xx?orgId=1&timezone=browser&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo"
    },
    // Individual tab iframes
    p50: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=p50_latency&var-field=p50&var-endpoint=%2Fpayment&panelId=1&_feature.dashboardSceneSolo=true",
    p90: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=p90_latency&var-field=p90&var-endpoint=%2Fpayment&panelId=1&_feature.dashboardSceneSolo=true",
    p99: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=p99_latency&var-field=p99&var-endpoint=%2Fpayment&panelId=1&_feature.dashboardSceneSolo=true",
    error400: "http://localhost:3000/d-solo/bee5sivy2wfeod/errors4xx?orgId=1&timezone=browser&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
    rps: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=rps&var-field=rps&var-endpoints=%2Forder&panelId=1&__feature.dashboardSceneSolo",
    traffic: "http://localhost:3000/d-solo/bee6ekhh16dq8c/trafficpere?orgId=1&timezone=browser&tab=queries&panelId=1&__feature.dashboardSceneSolo"
  };

  // Get the appropriate iframe URL based on active tab
  const getIframeUrl = () => {
    switch (activeTab) {
      case 0: return null; // Overview tab shows multiple panels
      case 1: return iframeUrls.p50;
      case 2: return iframeUrls.p90;
      case 3: return iframeUrls.p99;
      case 4: return iframeUrls.error400;
      case 5: return iframeUrls.rps;
      case 6: return iframeUrls.traffic;
      default: return iframeUrls.p50;
    }
  };

  const toggleDetailTabs = () => {
    setShowDetailTabs(!showDetailTabs);
  };

  return (
    <div className="dashboard-container bg-[#0f2922] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Microservice Monitoring Dashboard</h1>
          <p className="text-gray-300">Real-time performance metrics and service health</p>
        </div>
        
        {/* Controls and Filters */}
        <div className="bg-[#193B2D] p-4 rounded-lg shadow-lg mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left side - Tab Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleTabChange(0)}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 0
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={toggleDetailTabs}
                className={`px-4 py-2 rounded-md ${
                  showDetailTabs
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                Details
              </button>
              
              {showDetailTabs && (
                <div className="flex flex-wrap gap-2 ml-2">
                  {tabData.slice(1).map((tab, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTabChange(idx + 1)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        activeTab === idx + 1
                          ? 'bg-emerald-400 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right side - Filters */}
            <div className="flex items-center space-x-4">
              {/* Time Range Selector - Commented out for now */}
              {/* <div className="flex items-center">
                <span className="text-gray-300 mr-2">Time Range:</span>
                <select 
                  className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1"
                  value={timeFrame}
                  onChange={(e) => handleTimeFrame(e.target.value)}
                >
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="6h">6 hours</option>
                  <option value="12h">12 hours</option>
                  <option value="24h">24 hours</option>
                  <option value="7d">7 days</option>
                </select>
              </div> */}
              
              {/* Endpoint Selector - Commented out for now */}
              {/* <div className="flex items-center">
                <span className="text-gray-300 mr-2">Endpoint:</span>
                <select 
                  className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1"
                  value={selectedEndpoint}
                  onChange={handleEndpointChange}
                  disabled={isLoading || endpoints.length === 0}
                >
                  {endpoints.length > 0 ? (
                    endpoints.map((endpoint, index) => (
                      <option key={index} value={endpoint}>
                        {endpoint}
                      </option>
                    ))
                  ) : (
                    <option value="">No endpoints available</option>
                  )}
                </select>
              </div> */}
              
              {/* Refresh Button */}
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/60 text-white p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {/* Dashboard Content */}
        {viewType === 'Overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Latency Panel */}
            <div className="bg-[#193B2D] rounded-lg shadow-lg overflow-hidden group relative">
              <div className="bg-[#0a1e19] px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">Latency Overview</h3>
                  <p className="text-xs text-gray-400">Response time metrics across all endpoints</p>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 rounded-md shadow-lg p-4 z-10 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                    <h4 className="text-emerald-400 font-medium mb-2">Why Latency Matters</h4>
                    <p className="text-gray-300 text-sm">
                      Latency measures how long it takes for a request to receive a response. Lower latency means faster service.
                    </p>
                    <ul className="mt-2 text-xs text-gray-400 list-disc pl-4 space-y-1">
                      <li>P50: Half of requests are faster than this (median)</li>
                      <li>P90: 90% of requests are faster than this</li>
                      <li>P99: Only 1% of requests are slower than this</li>
                    </ul>
                    <div className="mt-2 text-xs text-emerald-500">
                      Target: &lt;100ms for optimal user experience
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 bg-gray-900">
                <iframe
                  key={`latency-${refreshKey}`}
                  src={iframeUrls.overview.latency}
                  className="w-full h-[300px]"
                  title="Latency Overview"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            
            {/* Error Rate Panel */}
            <div className="bg-[#193B2D] rounded-lg shadow-lg overflow-hidden group relative">
              <div className="bg-[#0a1e19] px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">Error Rate (4xx)</h3>
                  <p className="text-xs text-gray-400">Client error responses over time</p>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 rounded-md shadow-lg p-4 z-10 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                    <h4 className="text-red-400 font-medium mb-2">Why Error Rate Matters</h4>
                    <p className="text-gray-300 text-sm">
                      4xx errors indicate client-side problems, such as bad requests or unauthorized access attempts.
                    </p>
                    <ul className="mt-2 text-xs text-gray-400 list-disc pl-4 space-y-1">
                      <li>400: Bad Request - Malformed syntax</li>
                      <li>401: Unauthorized - Authentication required</li>
                      <li>403: Forbidden - Server refuses action</li>
                      <li>404: Not Found - Resource doesn't exist</li>
                    </ul>
                    <div className="mt-2 text-xs text-red-500">
                      Target: &lt;1% of total requests
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 bg-gray-900">
                <iframe
                  key={`error400-${refreshKey}`}
                  src={iframeUrls.overview.error400}
                  className="w-full h-[300px]"
                  title="Error Rate 400"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            
            {/* RPS Panel */}
            <div className="bg-[#193B2D] rounded-lg shadow-lg overflow-hidden group relative">
              <div className="bg-[#0a1e19] px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">Requests Per Second</h3>
                  <p className="text-xs text-gray-400">Traffic volume across services</p>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 rounded-md shadow-lg p-4 z-10 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                    <h4 className="text-blue-400 font-medium mb-2">Why RPS Matters</h4>
                    <p className="text-gray-300 text-sm">
                      Requests Per Second measures the load on your services. It helps identify traffic patterns and capacity needs.
                    </p>
                    <ul className="mt-2 text-xs text-gray-400 list-disc pl-4 space-y-1">
                      <li>Helps with capacity planning</li>
                      <li>Identifies traffic spikes</li>
                      <li>Correlates with other metrics</li>
                      <li>Indicates service popularity</li>
                    </ul>
                    <div className="mt-2 text-xs text-blue-500">
                      Monitor for: Sudden changes or consistent growth
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 bg-gray-900">
                <iframe
                  key={`rps-${refreshKey}`}
                  src={iframeUrls.overview.rps}
                  className="w-full h-[300px]"
                  title="RPS Overview"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            
            {/* Traffic Panel */}
            <div className="bg-[#193B2D] rounded-lg shadow-lg overflow-hidden group relative">
              <div className="bg-[#0a1e19] px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">Traffic Distribution</h3>
                  <p className="text-xs text-gray-400">Request volume by endpoint</p>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gray-900 rounded-md shadow-lg p-4 z-10 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                    <h4 className="text-purple-400 font-medium mb-2">Why Traffic Distribution Matters</h4>
                    <p className="text-gray-300 text-sm">
                      Shows which endpoints receive the most requests, helping identify hot spots in your architecture.
                    </p>
                    <ul className="mt-2 text-xs text-gray-400 list-disc pl-4 space-y-1">
                      <li>Identifies most-used services</li>
                      <li>Helps prioritize optimization efforts</li>
                      <li>Reveals usage patterns</li>
                      <li>Guides scaling decisions</li>
                    </ul>
                    <div className="mt-2 text-xs text-purple-500">
                      Look for: Uneven distribution that might indicate bottlenecks
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 bg-gray-900">
                <iframe
                  key={`traffic-${refreshKey}`}
                  src={iframeUrls.overview.traffic}
                  className="w-full h-[300px]"
                  title="Traffic Overview"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          // Detailed View for individual metrics
          <div className="bg-[#193B2D] rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#0a1e19] px-4 py-3 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">{viewType} Details</h3>
              <p className="text-xs text-gray-400">
                {activeTab === 1 && "50th percentile response time (median latency)"}
                {activeTab === 2 && "90th percentile response time (upper latency threshold)"}
                {activeTab === 3 && "99th percentile response time (worst-case latency)"}
                {activeTab === 4 && "Client error responses (4xx status codes)"}
                {activeTab === 5 && "Requests per second across the service"}
                {activeTab === 6 && "Traffic distribution across endpoints"}
              </p>
            </div>
            <div className="p-1 bg-gray-900">
              <iframe
                key={`detail-${activeTab}-${refreshKey}`}
                src={getIframeUrl()}
                className="w-full h-[600px]"
                title={`${viewType} Detail`}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        )}
        
        {/* Service Health Summary */}
        {viewType === 'Overview' && (
          <div className="mt-6 bg-[#193B2D] rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Service Health Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-emerald-900/30 p-3 rounded-md border border-emerald-800">
                <div className="text-emerald-400 text-sm font-medium mb-1">Avg. Latency</div>
                <div className="text-white text-2xl font-bold">42ms</div>
                <div className="text-emerald-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  5% improvement
                </div>
              </div>
              
              <div className="bg-red-900/30 p-3 rounded-md border border-red-800">
                <div className="text-red-400 text-sm font-medium mb-1">Error Rate</div>
                <div className="text-white text-2xl font-bold">2.4%</div>
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  0.8% increase
                </div>
              </div>
              
              <div className="bg-blue-900/30 p-3 rounded-md border border-blue-800">
                <div className="text-blue-400 text-sm font-medium mb-1">Avg. RPS</div>
                <div className="text-white text-2xl font-bold">128</div>
                <div className="text-blue-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12% increase
                </div>
              </div>
              
              <div className="bg-purple-900/30 p-3 rounded-md border border-purple-800">
                <div className="text-purple-400 text-sm font-medium mb-1">Uptime</div>
                <div className="text-white text-2xl font-bold">99.98%</div>
                <div className="text-purple-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  0.02% improvement
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
