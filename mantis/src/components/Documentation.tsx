import React from 'react';
// import { Link } from 'react-router-dom';
import TableOfContents from './documentation/TableOfContents';
import DocumentationHeader from './documentation/DocumentationHeader';
import DocumentationSection from './documentation/DocumentationSection';
import { DocumentationFooter } from './documentation/DocumentationFooter';
import { sections } from './documentation/documentationData';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f2922] text-gray-200 p-8 relative">
      {/* Animated background */}
      <div className="wave-background absolute inset-0 overflow-hidden -z-10">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <DocumentationHeader />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-8">
        <TableOfContents sections={sections} />
        
        <main className="flex-1 md:ml-8">
          {sections.map((section) => (
            <DocumentationSection 
              key={section.id}
              id={section.id}
              title={section.title}
              content={section.content}
            />
          ))}
          
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
          
          <DocumentationFooter />
        </main>
      </div>
    </div>
  );
};

export default Documentation;