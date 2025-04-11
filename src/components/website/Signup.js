// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
 
// export default function SignUp() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('User'); // Default olaraq 'User' seçilib
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
   
//     const registerData = { fullName, email, password, role };
 
//     try {
//       const response = await axios.post('https://localhost:7054/api/Auth/signup', registerData);
//       if (response.status === 200) {
//         alert(`Registration successful! You are registered as a ${role}. Waiting for admin approval.`);
//         history.push('/login');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred during registration.');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="auth-form">
//       <h2>Sign Up</h2>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="fullName">Full Name:</label>
//         <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
 
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
 
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
 
//         {/* Role seçimi üçün dropdown */}
//         <label htmlFor="role">Role:</label>
//         <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
//           <option value="User">User</option>
//           <option value="Trainer">Trainer</option>
//         </select>
 
//         <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Sign Up'}</button>
//       </form>
//     </div>
//   );
// }
 

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
 
export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default olaraq 'User' seçilib
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    const registerData = { fullName, email, password, role };
 
    try {
      const response = await axios.post('https://localhost:7054/api/Auth/signup', registerData);
      if (response.status === 200) {
        alert(`Registration successful! You are registered as a ${role}. Waiting for admin approval.`);
        history.push('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
 
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
 
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
 
        {/* Role seçimi üçün dropdown */}
        <label htmlFor="role">Role:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="User">User</option>
          <option value="Trainer">Trainer</option>
        </select>
 
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Sign Up'}</button>
      </form>
    </div>
  );
}
 