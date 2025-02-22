import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';

interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
}

interface DashboardProps {
  loggedInUser: LoggedInUser;
}

const Dashboard: React.FC<DashboardProps> = ({ loggedInUser }) => {
  const [viewType, setViewType] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('1h'); // Make sure this is acceptable to Grafana
  const [queryType, setQueryType] = useState('P50');
  const [activeTab, setActiveTab] = useState(0);

  // Construct the bucket name from the logged-in user's username.
  const userBucket = `bucket_${loggedInUser.username}`;

  // Tab labels
  const tabData = [
    { label: 'Overview' },
    { label: 'P50' },
    { label: 'P90' },
    { label: 'P99' },
    { label: 'Error Rate 500' },
    { label: 'Error Rate 400' },
    { label: 'Requests per second' },
    { label: 'Traffic per endpoint' },
  ];

  // Update viewType and active tab on tab change.
  const handleTabChange = (index: number) => {
    if (tabData[index].label === 'Overview') {
      setViewType('overview');
    } else {
      setViewType(tabData[index].label);
    }
    setActiveTab(index);
    setQueryType(tabData[index].label);
  };

  // Update time frame
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  // Build the Grafana URL. 
  // Make sure that your Grafana dashboard uses a variable named "bucket"
  // and that the Flux queries refer to it via: from(bucket: "${bucket}")
  const grafanaUrl = `http://localhost:3000/d-solo/${
    viewType === 'overview'
      ? 'becykw30pefpce/testing-grafana-with-volume'
      : 'becykw30pefpce/testing-grafana-with-volume'
  }
  ?orgId=1
  &timezone=browser
  &var-bucket=${userBucket}               /* Pass the dynamic bucket variable */
  &panelId=${activeTab + 1}
  &from=${timeFrame}                      /* Ensure this time format is valid */
  &to=now
  &queryType=${queryType}
  &__feature.dashboardSceneSolo`;

  // Log the URL for debugging
  useEffect(() => {
    console.log("Constructed Grafana URL:", grafanaUrl);
  }, [grafanaUrl]);

  return (
    <div>
      <h1 className="text-left text-emerald-950 tracking-widest ml-1 mb-1 font-semibold">
        METRICS
      </h1>

      {/* Timeframe selector */}
      <div>
        {['10m', '1h', '8h', '16h', '1d', '1w'].map((tf) => (
          <button key={tf} onClick={() => handleTimeFrame(tf)}>
            {tf}
          </button>
        ))}
      </div>

      <Tabs tabs={tabData} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="grafana-panels overflow-auto p-3 border-2 border-neutral-950 bg-[#A3CD9A] shadow-xl rounded-2xl">
        {viewType === 'overview' ? (
          // Show multiple panels for overview
          <div className="grid grid-cols-2 gap-3 max-h-[600px]">
            {[1, 2, 3, 4].map((panel) => (
              <iframe
                key={panel}
                src={`${grafanaUrl}&panelId=${panel}`}
                className="w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video"
                title={`overview-panel-${panel}`}
              ></iframe>
            ))}
          </div>
        ) : (
          // Single panel for other views
          <div className="flex justify-center">
            <iframe
              src={grafanaUrl}
              className="w-full h-auto min-w-[600px] min-h-[600px] max-w-[1200px] max-h-[1200px] aspect-video"
              title={`${queryType}-panel`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
;



