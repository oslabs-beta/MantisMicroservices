import React from 'react';
import Logo from '../assets/Logo.png';
import Register from './Register';

interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
  influxToken: string;
  bucket: string;
}

interface RegisterPageProps {
  onRegisterSuccess?: (user: LoggedInUser) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const handleOAuthLogin = (provider: string) => {
    console.log(`Initiate OAuth flow for ${provider}`);
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
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-[#193B2D]/60 z-0' />

      <div className='relative z-10 flex flex-col items-center justify-center max-w-md w-full p-4'>
        <Register onRegisterSuccess={onRegisterSuccess} />

        <div className='mt-6 text-center'>
          <span className='text-white font-medium'>or register with</span>
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

export default RegisterPage;
