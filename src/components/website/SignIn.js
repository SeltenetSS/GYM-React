import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import "./SignIn.css";

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

  useEffect(() => {
    document.body.classList.add('signin-body');
    return () => {
      document.body.classList.remove('signin-body');
    };
  }, []);

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

        if (role.toLowerCase() === roleFromURL) {
          history.push(`/${role.toLowerCase()}-dashboard`);
        } else {
          setError("You do not have access to this page.");
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
  };

  const handleSignUp = () => history.push('/sign-up');

  return (
    <div className="signin-page">
      <div className="signin-wrapper">
        <div className="signin-container">
          <h2>Sign In</h2>
          {error && <div className="signin-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={emailError ? 'signin-input signin-input-error' : 'signin-input'}
            />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6" 
              className={passwordError ? 'signin-input signin-input-error' : 'signin-input'}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          {roleFromURL !== 'admin' && (
            <div className="signin-links">
              <p>Don't have an account?</p>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
