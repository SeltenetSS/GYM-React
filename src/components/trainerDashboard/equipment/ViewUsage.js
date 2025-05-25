import React, { useState } from 'react';
import axios from 'axios';
import './ViewUsage.css';

const ViewUsage = () => {
  const [userId, setUserId] = useState('');
  const [usages, setUsages] = useState([]);

  const handleSearch = async () => {
    if (!userId) return alert("Please enter a User ID!");

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("Token tapılmadı! Zəhmət olmasa login olun.");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7054/api/UserEquipmentUsage/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setUsages(response.data);
    } catch (error) {
      console.error(error);
      alert("User not found or error occurred!");
    }
  };

  return (
    <div className="equipment-usage">
      <h2>View User Equipment Usage</h2>
      <div className="equipment-usage-form">
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {usages.length > 0 && (
        <table className="equipment-usage-table">
          <thead>
            <tr>
              <th>Equipment ID</th>
              <th>Duration (min)</th>
              <th>Repetitions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="equipment-usage-table2">
            {usages.map((usage, index) => (
              <tr key={index}>
                <td>{usage.equipmentId}</td>
                <td>{usage.durationInMinutes ?? "-"}</td>
                <td>{usage.repetition ?? "-"}</td>
                <td>{new Date(usage.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewUsage;
