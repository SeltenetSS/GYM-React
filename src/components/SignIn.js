import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // URL parametrindən 'role' dəyərini əldə etmək
  const roleFromURL = new URLSearchParams(location.search).get('role');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('https://your-api-url/api/auth/signin', loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.Token);  // Save token to localStorage
        const role = response.data.role; // Assuming the role is returned in the response

        // Redirect user based on role
        if (role === 'admin' || roleFromURL === 'admin') {
          history.push('/admin-dashboard');
        } else if (role === 'trainer') {
          history.push('/trainer-dashboard');
        } else if (role === 'user') {
          history.push('/user-dashboard');
        }
      }
    } catch (err) {
      if (err.response?.data?.message === 'Your account is not approved yet. Please wait for admin approval.') {
        setError('Your account is not approved yet. Please wait for admin approval.');
      } else {
        setError('Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    // Redirect based on user role
    history.push('/sign-up'); // Default sign-up page for users
  };

  const handleAdminSignUp = () => {
    history.push('/admin-sign-up'); // Admin-specific sign-up page
  };

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Sign-up Links */}
      <div className="sign-up-links">
        <p>Don't have an account?</p>
        <button onClick={handleSignUp}>Sign Up</button> {/* Standard user sign-up */}
        <p>If you're an admin, <button onClick={handleAdminSignUp}>Sign up here</button></p> {/* Admin sign-up */}
      </div>
    </div>
  );
}

