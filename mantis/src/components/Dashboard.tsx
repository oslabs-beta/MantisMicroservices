import React, { useState } from 'react';
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
  const [timeFrame, setTimeFrame] = useState('1h');
  const [queryType, setQueryType] = useState('P50');
  const [activeTab, setActiveTab] = useState(0);

  // If you store user data in distinct buckets, build the string:
  const userBucket = `bucket_${loggedInUser.username}`;

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

  // handle the tab change
  const handleTabChange = (index: number) => {
    if (tabData[index].label === 'Overview') {
      setViewType('overview');
    } else {
      setViewType(tabData[index].label);
    }
    setActiveTab(index);
    setQueryType(tabData[index].label);
  };

  // handle time frame (10m, 1h, 8h, 16h, 1d, 1w)
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  // We incorporate the userBucket in the URL as ?var-bucket=...
  // also using activeTab, timeFrame, queryType
  const grafanaUrl = `http://localhost:3000/d-solo/${
    viewType === 'overview'
      ? 'becykw30pefpce/testing-grafana-with-volume'
      : 'becykw30pefpce/testing-grafana-with-volume'
  }
  ?orgId=1
  &timezone=browser
  &var-bucket=${userBucket}               // <--- dynamic bucket
  &panelId=${activeTab + 1}
  &from=${timeFrame}
  &to=now
  &queryType=${queryType}
  &__feature.dashboardSceneSolo`;

  return (
    <div>
      <h1 className="text-left text-emerald-950 tracking-widest ml-1 mb-1 font-semibold">
        METRICS
      </h1>

      {/* Example timeFrame selector */}
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



