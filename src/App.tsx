// src/App.tsx
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Documentation from './components/Documentation';
import LoginPage from './components/LoginPage'; // Your updated login component
import RegisterPage from './components/RegisterPage';

// A TypeScript interface for the logged-in user
interface LoggedInUser {
  _id: string;
  username: string;
  token: string;
}

function App() {
  // Store the user object once logged in
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Top navigation */}
      <NavBar />

      {/* Main content area */}
      <div className="flex-1">
        <Routes>
          {/* 1) Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* 2) The Login Route */}
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={(user: LoggedInUser) => {
                  setLoggedInUser(user);
                  // You could optionally navigate to '/dashboard' here
                }}
              />
            }
          />

          {/* 3) The Dashboard Route (Protected) */}
          <Route
            path="/dashboard"
            element={
              // If no loggedInUser, redirect to /login
              loggedInUser ? (
                <Dashboard loggedInUser={loggedInUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 4) The Register Route */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Fallback or 404 could go here if desired */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
