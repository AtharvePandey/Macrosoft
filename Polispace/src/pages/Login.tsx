import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/polispacelogo.svg";

const Login = () => {
  // State Management Section
  // Tracks form input and UI states
  const [username, setUsername] = useState(""); // Stores username input
  const [password, setPassword] = useState(""); // Stores password input
  const [error, setError] = useState(""); // Stores error messages
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state during auth
  const navigate = useNavigate(); // Router navigation hook

  // Authentication Handler
  // Handles form submission and authentication flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setIsLoading(true); // Activate loading state
    setError(""); // Clear previous errors

    try {
      // development bypass 
      if (username === "admin" && password === "password") {
        localStorage.setItem('isAuthenticated', 'true'); // Set auth flag
        navigate('/'); // Redirect to home
        return; // Exit early
      }

      // Auth flow
      // 1. Send credentials to authentication service
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // 2. Process server response
      const data = await response.json();

      // 3. Handle failed authentication
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // 4. Successful authentication
      localStorage.setItem('isAuthenticated', 'true'); // Persist auth state
      navigate('/'); // Redirect to home

    } catch (err) {
      // Display login error
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      // Always disable loading state when done
      setIsLoading(false);
    }
  };

  // Component Render Section
  return (
    // Main Container - Sets background and centers content
    <div className="min-h-screen bg-[#ec3f5b] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header Section - Logo and welcome message */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-4">
          <h1 className="mt-4 text-2xl font-extrabold text-white">
            Welcome to PoliSpace
          </h1>
          <p className="text-white mt-2">Your political discussion platform</p>
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="PoliSpace Logo" 
              className="h-50 w-50" 
            />
          </div>
        </div>

        {/* Login Instructions */}
        <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Hint: it's admin and password.
        </p>
      </div>

      {/* Form Container - White card with form elements */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          
          {/* Error Display - Shows authentication errors */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ec3f5b] hover:bg-[#d13751] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec3f5b] disabled:opacity-50"
                disabled={isLoading}
              >
                {/* Conditional Loading State */}
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
