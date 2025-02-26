// src/components/NavBar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mantisLogo from '../assets/wingLogo.png'; // an image of your choice

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check authentication status on component mount and periodically
  useEffect(() => {
    // Function to check if user is logged in
    const checkLoginStatus = () => {
      const user = localStorage.getItem('mantisUser');
      setIsLoggedIn(!!user);
    };
    
    // Check immediately on mount
    checkLoginStatus();
    
    // Set up event listener for storage changes (for cross-tab synchronization)
    window.addEventListener('storage', checkLoginStatus);
    
    // Also set up a periodic check (every 2 seconds)
    const intervalId = setInterval(checkLoginStatus, 2000);
    
    // Clean up event listeners and interval
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mantisUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className='flex items-center justify-between bg-[#193B2D] px-6 py-3 shadow-md sticky top-0 z-50'>
      {/* Left side - logo and brand name */}
      <Link to='/' className='flex items-center group'>
        <div className="relative overflow-hidden rounded-full bg-emerald-900/30 p-1 transition-all duration-300 group-hover:bg-emerald-800/40">
          <img 
            src={mantisLogo} 
            alt='Mantis Logo' 
            className='h-9 w-9 transition-transform duration-300 group-hover:scale-110' 
          />
        </div>
        <span
          className='text-white text-2xl font-bold ml-3 transition-colors duration-300 group-hover:text-emerald-400'
          style={{ fontFamily: '"Faustina", sans-serif' }}
        >
          Mantis
        </span>
      </Link>

      {/* Right side - navigation links */}
      <div className='flex items-center space-x-4'>
        {/* Documentation link */}
        <Link
          to="/documentation"
          className="text-gray-200 hover:text-emerald-400 transition-colors text-sm font-medium"
        >
          Docs
        </Link>
        
        {/* GitHub link */}
        <a
          href='https://github.com/oslabs-beta/mantis_project'
          target='_blank'
          rel='noreferrer'
          className='text-gray-200 hover:text-emerald-400 transition-colors text-sm font-medium'
        >
          GitHub
        </a>
        
        {/* Dashboard button - always visible and most prominent */}
        <Link
          to='/dashboard'
          className='px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg text-sm'
        >
          Dashboard
        </Link>
        
        {/* Login/Logout button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 text-white font-medium rounded-md transition-all border border-[#164237] backdrop-blur-sm text-sm'
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className='px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 text-white font-medium rounded-md transition-all border border-[#164237] backdrop-blur-sm text-sm'
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
