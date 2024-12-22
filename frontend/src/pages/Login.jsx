import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextField from '../components/Form/TextField';
import Button from '../components/Button/Button';
import * as authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    try {
      // authService.login is expected to throw an error or return a token on success
      await authService.login(email, password);
      // On success, redirect user to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // Show any error from the login call
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h2
            className="text-2xl font-semibold text-center mb-6"
            style={{ fontFamily: 'Poppins', color: '#003366' }}
          >
            VC Dashboard Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {errorMsg && (
              <p className="text-red-500 text-sm" style={{ fontFamily: 'Open Sans' }}>
                {errorMsg}
              </p>
            )}
            <Button type="submit" variant="primary" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
