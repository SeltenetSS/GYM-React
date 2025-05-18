import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blocked.css';
 
 
const Blocked = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
   const fetchBlockedUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // Tokenin harada saxlandığından asılı olaraq dəyiş
    const response = await axios.get('https://localhost:7054/api/Payment/delayed-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setBlockedUsers(response.data);
  } catch (error) {
    console.error('Error fetching blocked users:', error);
  } finally {
    setLoading(false);
  }
};
 
    fetchBlockedUsers();
  }, []);
 
  return (
    <div className="content">
      <h2 className="title">Blocked Members</h2>
 
      {loading ? (
        <p>Loading...</p>
      ) : blockedUsers.length === 0 ? (
        <p>No blocked users found.</p>
      ) : (
        <table className="blocked-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Blocked Date</th>
            </tr>
          </thead>
          <tbody>
            {blockedUsers.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.blockedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 
export default Blocked;
 
 