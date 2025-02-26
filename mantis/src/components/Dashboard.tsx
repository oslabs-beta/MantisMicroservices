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
  const userBucket = loggedInUser.bucket;

  // Fetch available endpoints when the component mounts
  useEffect(() => {
    const fetchEndpoints = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/endpoints', {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`
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

    fetchEndpoints();
  }, [loggedInUser.token]);

  // Tab data with corresponding measurement values
  const tabData = [
    { label: 'Overview', measurement: '' },
    { label: 'P50', measurement: 'p50_latency', field: 'p50' },
    { label: 'P90', measurement: 'p90_latency', field: 'p90' },
    { label: 'P99', measurement: 'p99_latency', field: 'p99' },
    { label: 'Error Rate 500', measurement: 'error_5xx', field: 'count' },
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
      errors: "http://localhost:3000/d-solo/bee5sivy2wfeod/errors4xx?orgId=1&timezone=browser&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
      rps: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=rps&var-field=rps&var-endpoints=%2Forder&panelId=1&__feature.dashboardSceneSolo",
      traffic: "http://localhost:3000/d-solo/bee6ekhh16dq8c/trafficpere?orgId=1&timezone=browser&tab=queries&panelId=1&__feature.dashboardSceneSolo"
    },
    // Individual tab iframes
    p50: "http://localhost:3000/d-solo/eee62wn5v4glca/p50?orgId=1&timezone=browser&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
    p90: "http://localhost:3000/d-solo/aee632my6ch6oc/p90?orgId=1&timezone=browser&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
    p99: "http://localhost:3000/d-solo/dee637m08bgg0a/p99?orgId=1&timezone=browser&var-query0=&editIndex=0&var-bucket=bucket_test&panelId=1&__feature.dashboardSceneSolo",
    error500: "http://localhost:3000/d-solo/becykw30pefpce/testing-grafana-with-volume?orgId=1&timezone=browser&var-bucket=bucket_test&var-measurement=error_5xx&var-field=count&var-endpoint=%2Fpayment&panelId=2&_feature.dashboardSceneSolo=true",
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
      case 4: return iframeUrls.error500;
      case 5: return iframeUrls.error400;
      case 6: return iframeUrls.rps;
      case 7: return iframeUrls.traffic;
      default: return iframeUrls.p50;
    }
  };

  const toggleDetailTabs = () => {
    setShowDetailTabs(!showDetailTabs);
  };

  return (
    <div className="dashboard-container relative">
      {/* Animated background */}
      <div className="wave-background absolute inset-0 overflow-hidden -z-10">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Custom tab navigation with Overview and Details buttons */}
        <div className="flex mb-4 items-center">
          <button
            onClick={() => {
              handleTabChange(0);
              setShowDetailTabs(false);
            }}
            className={`px-4 py-2 rounded-md mr-2 ${
              activeTab === 0
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={toggleDetailTabs}
            className={`px-4 py-2 rounded-md mr-3 ${
              showDetailTabs
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            Details
          </button>

          {/* Show detailed tabs on the same line when Details is clicked */}
          {showDetailTabs && (
            <div className="flex flex-wrap gap-1">
              {tabData.slice(1).map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabChange(idx + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeTab === idx + 1
                      ? 'bg-emerald-400 text-white shadow-md'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grafana-panels overflow-auto p-4 border border-gray-700 bg-gray-900 bg-opacity-80 shadow-lg rounded-lg">
          {viewType === 'Overview' ? (
            // Show multiple panels for overview with improved spacing
            <div className="grid grid-cols-2 gap-6 max-h-[700px]">
              <iframe
                key={`latency-${refreshKey}`}
                src={iframeUrls.overview.latency}
                className="w-full h-auto min-w-[275px] min-h-[300px] max-w-[600px] max-h-[600px] aspect-video"
                title="Latency Overview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <iframe
                key={`errors-${refreshKey}`}
                src={iframeUrls.overview.errors}
                className="w-full h-auto min-w-[275px] min-h-[300px] max-w-[600px] max-h-[600px] aspect-video"
                title="Errors Overview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <iframe
                key={`rps-${refreshKey}`}
                src={iframeUrls.overview.rps}
                className="w-full h-auto min-w-[275px] min-h-[300px] max-w-[600px] max-h-[600px] aspect-video"
                title="RPS Overview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <iframe
                key={`traffic-${refreshKey}`}
                src={iframeUrls.overview.traffic}
                className="w-full h-auto min-w-[275px] min-h-[300px] max-w-[600px] max-h-[600px] aspect-video"
                title="Traffic Overview"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            // Single panel for other views
            <div className="flex justify-center">
              <iframe
                key={`panel-${activeTab}-${refreshKey}`}
                src={getIframeUrl()}
                className="w-full h-auto min-w-[600px] min-h-[600px] max-w-[1200px] max-h-[1200px] aspect-video"
                title={`${viewType}-panel`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
