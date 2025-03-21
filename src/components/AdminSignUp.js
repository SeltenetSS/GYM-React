import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

    const registerData = {
      email: email,
      password: password,
      fullName: fullName,
    };

    try {
      // Admin kayıt işlemi
      const response = await axios.post('https://your-api-url/api/auth/signup-admin', registerData);
      
      if (response.status === 200) {
        // Kayıt başarılıysa admin olarak giriş yapalım
        const loginData = {
          email: email,
          password: password,
        };

        const loginResponse = await axios.post('https://your-api-url/api/auth/signin', loginData);

        if (loginResponse.status === 200) {
          // Token'ı localStorage'a kaydedelim
          localStorage.setItem('token', loginResponse.data.Token);
          history.push('/admin-dashboard'); // Admin paneline yönlendirme
        }
      }
    } catch (err) {
      if (err.response?.data?.message === 'Registration failed!') {
        setError('Admin registration failed.');
      } else {
        setError('An error occurred. Please try again.');
      }
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
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
