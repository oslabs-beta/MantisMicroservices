import React from 'react';
import Logo from '../assets/Logo.png';
import Login from './Login'; // We'll pass onLoginSuccess to this

// Define an interface for the user if you want typed
interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
}

// Props for LoginPage
interface LoginPageProps {
  onLoginSuccess?: (user: LoggedInUser) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Dummy OAuth handler; replace with your actual OAuth login logic
  const handleOAuthLogin = (provider: string) => {
    console.log(`Initiate OAuth flow for ${provider}`);
    // For a real implementation, you might redirect to your OAuth endpoint:
    // window.location.href = `https://your-oauth-endpoint.com/auth?provider=${provider}`;
  };

  return (
    <div
      className='login-page relative h-screen w-full flex flex-col items-center justify-center 
                 bg-center bg-cover bg-no-repeat'
      style={{
        fontFamily: '"IBM Plex Serif", sans-serif',
        backgroundImage: `url(${Logo})`,
        backgroundSize: 'contain',
      }}
    >
      {/* Subtle gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-[#193B2D]/60 z-0' />

      {/* Main container for content */}
      <div className='relative z-10 flex flex-col items-center justify-center max-w-md w-full p-4'>
        {/* Optional heading or brand text */}
        <h1
          className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-widest'
          style={{ fontFamily: '"Faustina", sans-serif' }}
        >
          {/* “Mantis” or “Welcome Back” or any brand text */}
        </h1>

        {/* Login form component, pass down onLoginSuccess */}
        <Login onLoginSuccess={onLoginSuccess} />

        {/* OAuth Section */}
        <div className='mt-6 text-center translate-y-25'>
          <span className='text-white font-medium'>or sign in with</span>
          <div className='flex gap-4 justify-center mt-4'>
            <button
              onClick={() => handleOAuthLogin('google')}
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-md'
            >
              Google
            </button>
            <button
              onClick={() => handleOAuthLogin('github')}
              className='bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-full shadow-md'
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
