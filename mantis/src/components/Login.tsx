import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// For TypeScript, define an interface for user data returned from /login
interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
  influxToken: string;
  bucket: string;
  email?: string;
}

interface LoginProps {
  // Callback to notify parent of a successful login
  onLoginSuccess?: (user: LoggedInUser) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle controlled inputs
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Dummy "navigate to register" function
  const handleRegister = () => {
    navigate('/register');
  };

  // The real fetch logic for /login with automatic redirection on success
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter your email (username) and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password }),
      });

      if (!response.ok) {
        alert('Invalid credentials or server error');
        return;
      }
      const data = await response.json();
      alert('Login successful!');

      // Notify parent of successful login, if callback provided
      if (onLoginSuccess) {
        onLoginSuccess({
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
          token: data.token,
          influxToken: data.user.influxToken,
          bucket: data.user.bucket,
        });
      }

      // Automatically route to the dashboard after login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Error during login');
    }
  };

  return (
    <div className='login-container flex justify-end items-center w-full translate-y-28'>
      {/* Glass/blur effect container */}
      <div
        className='
          login-form w-full max-w-sm p-6 
          rounded-xl shadow-2xl 
          bg-[rgba(25,59,45,0.5)] 
          backdrop-blur-md
        '
      >
        <h1
          className='text-2xl font-semibold text-white mb-4'
          style={{ fontFamily: '"Faustina", sans-serif' }}
        >
          Login
        </h1>

        {/* Main form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Email or Username */}
          <input
            type='text'
            id='email'
            placeholder='Email or Username'
            value={email}
            onChange={handleEmailChange}
            className='w-full p-2 rounded-md focus:outline-none border hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#A3CD9A]'
          />

          {/* Password */}
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            className='w-full p-2 rounded-md focus:outline-none border hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#A3CD9A]'
          />

          {/* Forgot Password */}
          <div className='text-right'>
            <button
              type='button'
              className='text-sm text-[#fdb53d] hover:text-[#fce3a9]'
            >
              Forgot Password
            </button>
          </div>

          {/* Sign In */}
          <button
            type='submit'
            className='login-button w-full py-2 mt-2 rounded-md bg-[#A3CD9A] text-[#193B2D] font-semibold hover:bg-[#fdf6bf] transition-colors duration-200'
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Sign In
          </button>

          {/* Register */}
          <button
            type='button'
            onClick={handleRegister}
            className='text-sm text-white mt-2 hover:underline'
          >
            Don&apos;t have an account?{' '}
            <span className='font-bold'>Register</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
