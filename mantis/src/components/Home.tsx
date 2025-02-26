import React from 'react';
import { Link } from 'react-router-dom';
import mantisIcon1 from '../assets/6.png';
import mantisIcon2 from '../assets/7.png';
import mantisIcon3 from '../assets/8.png';
import ecosystemImage from '../assets/Ecosystem.png';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col text-xl'>
      {/* Hero Section */}
      <section
        className='
          relative 
          bg-gradient-to-r 
          from-[#0f2922] 
          via-[#164237] 
          to-[#1a5245]
          text-white 
          px-8 
          py-20 
          flex 
          flex-col 
          md:flex-row
          overflow-hidden
        '
      >
        {/* Animated Wave Pattern (Background) */}
        <div className="wave-background absolute inset-0 overflow-hidden -z-0 opacity-30">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>

        {/* Left Column - Hero Content */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center z-10">
          <h1
            className="text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Mantis Microservice Dashboard
          </h1>
          <p className="text-xl font-light text-gray-100 bg-[#0a1e19]/60 backdrop-blur-sm p-6 rounded-md border border-[#164237]">
            Discover Mantis, a state-of-the-art browser-based dashboard designed
            to provide dynamic load balancing, performance monitoring, and real-time
            observability for your microservices architecture.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              to="/dashboard" 
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
            >
              Launch Dashboard
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              to="/documentation" 
              className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 text-white font-medium rounded-md transition-all border border-[#164237] backdrop-blur-sm flex items-center justify-center"
            >
              View Documentation
            </Link>
          </div>
        </div>

        {/* Right Column - Feature Highlights */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center z-10 mt-8 md:mt-0">
          <div className="bg-[#0a1e19]/60 backdrop-blur-sm p-6 rounded-md border border-[#164237]">
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">Key Capabilities</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time metrics collection and visualization</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Intelligent traffic routing based on service health</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Seamless integration with Prometheus and Grafana</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Comprehensive API gateway functionality</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Docker-ready deployment for quick setup</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Wave Divider from Hero to Features */}
      <div className='relative w-full h-20 -mt-1'>
        <svg
          className='absolute bottom-0 left-0 w-full h-full text-[#1a1a1a]'
          fill='currentColor'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
        >
          <path
            fill='currentColor'
            d='M0,64L30,74.7C60,85,120,107,180,138.7C240,171,300,213,360,197.3C420,181,480,107,540,101.3C600,96,660,160,720,186.7C780,213,840,203,900,192C960,181,1020,171,1080,154.7C1140,139,1200,117,1260,112C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z'
          />
        </svg>
      </div>

      {/* Features Section */}
      <section className="bg-[#1a1a1a] text-white flex flex-col md:flex-row items-center justify-evenly py-16 px-8">
        {/* Feature 1 */}
        <div
          className='
            max-w-sm 
            mb-12 
            md:mb-0 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          '
        >
          <img
            src={mantisIcon1}
            alt='Dynamic Loading'
            className='mx-auto w-40 h-40 mb-4'
          />
          <h3 className="text-2xl font-bold text-emerald-400">Dynamic Loading</h3>
          <p className="mt-2 text-base text-gray-300">
            Routes traffic intelligently using real-time Prometheus metrics, ensuring efficient microservice distribution and preventing overload.
          </p>
        </div>
        {/* Feature 2 */}
        <div
          className='
            max-w-sm 
            mb-12 
            md:mb-0 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          '
        >
          <img
            src={mantisIcon2}
            alt='Performance Monitoring'
            className='mx-auto w-40 h-40 mb-4'
          />
          <h3 className="text-2xl font-bold text-emerald-400">Performance Monitoring</h3>
          <p className="mt-2 text-base text-gray-300">
            Tracks resource usage trends to help engineers manually optimize scaling decisions, improving efficiency and reducing costs.
          </p>
        </div>
        {/* Feature 3 */}
        <div
          className='
            max-w-sm 
            text-center 
            transform 
            transition-transform 
            duration-300 
            hover:scale-105
          '
        >
          <img
            src={mantisIcon3}
            alt='Seamless Observability'
            className='mx-auto w-40 h-40 mb-4'
          />
          <h3 className="text-2xl font-bold text-emerald-400">Seamless Observability</h3>
          <p className="mt-2 text-base text-gray-300">
            Engineers gain instant visibility into microservice performance with Prometheus, Grafana dashboards, and real-time WebSocket updates for better troubleshooting.
          </p>
        </div>
      </section>

      {/* Installation Section */}
      <section className="bg-[#0f2922] text-white p-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Get Started in Minutes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0a1e19] p-6 rounded-lg border border-[#164237]">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Docker Installation</h3>
              <p className="mb-4 text-gray-300">
                Deploy the entire Mantis stack with a single command:
              </p>
              <div className="bg-[#111827] rounded-md p-3">
                <code className="text-gray-100 text-sm">git clone https://github.com/your-org/mantis.git</code>
              </div>
              <div className="bg-[#111827] rounded-md p-3 mt-2">
                <code className="text-gray-100 text-sm">cd mantis</code>
              </div>
              <div className="bg-[#111827] rounded-md p-3 mt-2">
                <code className="text-gray-100 text-sm">docker-compose up --build</code>
              </div>
            </div>
            <div className="bg-[#0a1e19] p-6 rounded-lg border border-[#164237]">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">NPM Package</h3>
              <p className="mb-4 text-gray-300">
                Integrate Mantis directly into your Node.js applications:
              </p>
              <div className="bg-[#111827] rounded-md p-3">
                <code className="text-gray-100 text-sm">npm install mantis-sdk</code>
              </div>
              <div className="bg-[#111827] rounded-md p-3 mt-2">
                <code className="text-gray-100 text-sm">const Mantis = require("mantis-sdk");</code>
              </div>
              <div className="bg-[#111827] rounded-md p-3 mt-2">
                <code className="text-gray-100 text-sm">Mantis.start();</code>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
            >
              Launch Dashboard
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wave Divider from White to Dark Footer */}
      <div className="relative w-full h-32 -mt-1 bg-[#1a1a1a]">
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-[#1a1a1a]"
          fill="currentColor"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#333333"
            d="M0,160L30,186.7C60,213,120,267,180,282.7C240,299,300,277,360,256C420,235,480,213,540,186.7C600,160,660,128,720,128C780,128,840,160,900,160C960,160,1020,128,1080,106.7C1140,85,1200,75,1260,80C1320,85,1380,107,1410,117.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-[#333333] text-gray-300 text-base p-8 flex justify-center">
        <div className="max-w-5xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Mantis</h3>
              <p>Open-source microservice monitoring</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/your-org/mantis" className="text-gray-300 hover:text-emerald-400 transition-colors">
                GitHub
              </a>
              <Link to="/documentation" className="text-gray-300 hover:text-emerald-400 transition-colors">
                Documentation
              </Link>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p>Copyright © 2023 Mantis Microservice, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
