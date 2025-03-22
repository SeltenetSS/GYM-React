import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './AdminSignUp.css'; // CSS faylını import et

export default function AdminSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const registerData = { email, password, fullName };

    try {
      const response = await axios.post('https://localhost:7054/api/Auth/signup-admin', registerData);

      if (response.status === 200) {
        alert('Registration successful!');
        history.push('/login');
      }

      // if (response.status === 200) {
      //   history.push('/login');
      //   const loginData = { email, password };
      //   const loginResponse = await axios.post('https://localhost:7054/api/Auth/signin', loginData);

      //   if (loginResponse.status === 200) {
      //     localStorage.setItem('token', loginResponse.data.Token);
      //     history.push('/admin-dashboard');
      //   }
      // }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Admin Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label><br></br>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label><br></br>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label><br></br>
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
