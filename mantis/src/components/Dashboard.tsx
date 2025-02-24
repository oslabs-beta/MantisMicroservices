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
  loggedInUser: LoggedInUser;
}

const Dashboard: React.FC<DashboardProps> = ({ loggedInUser }) => {
  const [viewType, setViewType] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('1h');
  const [activeTab, setActiveTab] = useState(0);
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    { label: 'Requests per second', measurement: 'rps', field: 'rps' },
    { label: 'Traffic per endpoint', measurement: 'traffic', field: 'count' },
  ];

  // Update viewType and active tab on tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setViewType(tabData[index].label);
  };

  // Update time frame
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  // Handle endpoint selection
  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndpoint(e.target.value);
  };

  // Convert timeFrame to Flux-compatible time range
  const getTimeRange = () => {
    switch (timeFrame) {
      case '10m': return 'start: -10m';
      case '1h': return 'start: -1h';
      case '8h': return 'start: -8h';
      case '16h': return 'start: -16h';
      case '1d': return 'start: -1d';
      case '1w': return 'start: -1w';
      default: return 'start: -1h';
    }
  };

  // Build the Grafana URL with all required variables
  const buildGrafanaUrl = (panelId: number) => {
    const dashboardId = 'becykw30pefpce';
    const dashboardName = 'testing-grafana-with-volume';
    
    // Get the current tab's measurement and field
    const currentTab = tabData[activeTab];
    const measurement = currentTab.measurement || '';
    const field = currentTab.field || '';
    
    // Build the URL with all necessary parameters
    return `http://localhost:3000/d-solo/${dashboardId}/${dashboardName}?orgId=1
      &timezone=browser
      &var-bucket=${encodeURIComponent(userBucket)}
      &var-endpoint=${encodeURIComponent(selectedEndpoint || '')}
      &var-field=${encodeURIComponent(field)}
      &var-measurement=${encodeURIComponent(measurement)}
      &var-timeRange=${encodeURIComponent(getTimeRange())}
      &panelId=${panelId}
      &refresh=5s`;
  };

  return (
    <div>
      <h1 className="text-left text-emerald-950 tracking-widest ml-1 mb-1 font-semibold">
        METRICS
      </h1>

      {/* Controls row with timeframe and endpoint selectors */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Timeframe selector */}
        <div className="flex items-center">
          <span className="mr-2 font-medium">Time Range:</span>
          <div className="flex space-x-1">
            {['10m', '1h', '8h', '16h', '1d', '1w'].map((tf) => (
              <button 
                key={tf} 
                onClick={() => handleTimeFrame(tf)}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeFrame === tf 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Endpoint selector */}
        <div className="flex items-center">
          <span className="mr-2 font-medium">Endpoint:</span>
          {isLoading ? (
            <span>Loading endpoints...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <select 
              value={selectedEndpoint} 
              onChange={handleEndpointChange}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              {endpoints.length === 0 ? (
                <option>No endpoints available</option>
              ) : (
                endpoints.map((endpoint) => (
                  <option key={endpoint} value={endpoint}>
                    {endpoint}
                  </option>
                ))
              )}
            </select>
          )}
        </div>
      </div>

      <Tabs tabs={tabData} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="grafana-panels overflow-auto p-3 border-2 border-neutral-950 bg-[#A3CD9A] shadow-xl rounded-2xl">
        {viewType === 'Overview' ? (
          // Show multiple panels for overview
          <div className="grid grid-cols-2 gap-3 max-h-[600px]">
            {[1, 2, 3, 4].map((panel) => (
              <iframe
                key={panel}
                src={buildGrafanaUrl(panel)}
                className="w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video"
                title={`overview-panel-${panel}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        ) : (
          // Single panel for other views
          <div className="flex justify-center">
            <iframe
              src={buildGrafanaUrl(activeTab + 1)}
              className="w-full h-auto min-w-[600px] min-h-[600px] max-w-[1200px] max-h-[1200px] aspect-video"
              title={`${viewType}-panel`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



