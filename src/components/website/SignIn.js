// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';


// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();
//   const location = useLocation();

//   const roleFromURL = new URLSearchParams(location.search).get('role');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const loginData = { email, password };
 
//     try {
//       const response = await axios.post('https://localhost:7054/api/Auth/signin', loginData);
 
//       if (response.status === 200) {
//         localStorage.setItem('token', response.data.token);
        
//         const role = response.data.role;
       
//         console.log("Server Response:", response.data);
 
 
//         // Eğer rol admin ise ve URL'de de admin var, admin dashboard'a yönlendirilir
//         if (role.toLowerCase() === 'admin') {
//           if (roleFromURL === 'admin') {
//             history.push('/admin-dashboard');
//           } else {
//             setError("You do not have access to this page.");
//           }
//         }
     
//         else if (role.toLowerCase() === 'trainer') {
//           if (roleFromURL === 'trainer') {
//             history.push('/trainer-dashboard');
//           } else {
//             setError("You do not have access to this page.");
//           }
//         }
       
//         else if (role.toLowerCase() === 'user') {
//           if (roleFromURL === 'user') {
//             history.push('/user-dashboard');
//           } else {
//             setError("You do not have access to this page.");
//           }
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message === 'Your account is not approved yet. Please wait for admin approval.'
//         ? 'Your account is not approved yet. Please wait for admin approval.'
//         : 'Invalid email or password.');
//     } finally {
//       setLoading(false);
//     }
// }
 
       
//   const handleSignUp = () => history.push('/sign-up');
//   const handleAdminSignUp = () => history.push('/admin-sign-up');

//   return (
//     <div className="auth-form">
//       <h2>Sign In</h2>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />

//         <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
//       </form>

//       <div className="sign-up-links">
//         <p>Don't have an account?</p>
//         <button onClick={handleSignUp}>Sign Up</button>
//         <p>If you're an admin, <button onClick={handleAdminSignUp}>Sign up here</button></p>
//       </div>
//     </div>
//   );
// }

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const loginData = { email, password };

    try {
      const response = await axios.post('https://localhost:7054/api/Auth/signin', loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        
        const role = response.data.role;
        console.log("Server Response:", response.data);

        const { roleFromURL } = this.props.location.search ? new URLSearchParams(this.props.location.search).get('role') : '';

        if (role.toLowerCase() === 'admin') {
          if (roleFromURL === 'admin') {
            this.props.history.push('/admin-dashboard');
          } else {
            this.setState({ error: "You do not have access to this page." });
          }
        } else if (role.toLowerCase() === 'trainer') {
          if (roleFromURL === 'trainer') {
            this.props.history.push('/trainer-dashboard');
          } else {
            this.setState({ error: "You do not have access to this page." });
          }
        } else if (role.toLowerCase() === 'user') {
          if (roleFromURL === 'user') {
            this.props.history.push('/user-dashboard');
          } else {
            this.setState({ error: "You do not have access to this page." });
          }
        }
      }
    } catch (err) {
      this.setState({
        error: err.response?.data?.message === 'Your account is not approved yet. Please wait for admin approval.'
          ? 'Your account is not approved yet. Please wait for admin approval.'
          : 'Invalid email or password.'
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSignUp = () => {
    this.props.history.push('/sign-up');
  }

  handleAdminSignUp = () => {
    this.props.history.push('/admin-sign-up');
  }

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h2>Sign In</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={this.handleChange} 
              required 
            />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={this.handleChange} 
              required 
              minLength="6" 
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="sign-up-links">
            <p>Don't have an account?</p>
            <button onClick={this.handleSignUp}>Sign Up</button>
            <p>If you're an admin, <button onClick={this.handleAdminSignUp}>Sign up here</button></p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
