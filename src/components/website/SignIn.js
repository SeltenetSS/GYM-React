import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import "./SignIn.css"

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const roleFromURL = new URLSearchParams(location.search).get('role');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(false);
    setPasswordError(false);
    const loginData = { email, password };

    try {
      const response = await axios.post('https://localhost:7054/api/Auth/signin', loginData);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        
        const role = response.data.role;

        if (role.toLowerCase() === 'admin') {
          if (roleFromURL === 'admin') {
            history.push('/admin-dashboard');
          } else {
            setError("You do not have access to this page.");
          }
        } else if (role.toLowerCase() === 'trainer') {
          if (roleFromURL === 'trainer') {
            history.push('/trainer-dashboard');
          } else {
            setError("You do not have access to this page.");
          }
        } else if (role.toLowerCase() === 'user') {
          if (roleFromURL === 'user') {
            history.push('/user-dashboard');
          } else {
            setError("You do not have access to this page.");
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message === 'Your account is not approved yet. Please wait for admin approval.'
        ? 'Your account is not approved yet. Please wait for admin approval.'
        : 'Invalid email or password.');
      if (err.response?.data?.message === 'Invalid email or password.') {
        setEmailError(true);
        setPasswordError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSignUp = () => history.push('/sign-up');
  const handleAdminSignUp = () => history.push('/admin-sign-up');

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={emailError ? 'input-error' : ''}
          />

          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength="6" 
            className={passwordError ? 'input-error' : ''}
          />

          <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>

        <div className="sign-up-links">
          <p>Don't have an account?</p>
          <button onClick={handleSignUp}>Sign Up</button>
          <p>If you're an admin, <button onClick={handleAdminSignUp}>Sign up here</button></p>
        </div>
      </div>
    </div>
  );
}
