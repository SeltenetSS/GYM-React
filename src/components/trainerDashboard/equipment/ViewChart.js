import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import './EquipmentUsageChart.css';

const EquipmentUsageChart = () => {
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState([]);

  const handleSearch = async () => {
    if (!userId) return alert("Please enter a User ID!");

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("Token tapılmadı! Zəhmət olmasa login olun.");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7054/api/UserEquipmentUsage/stats/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error(error);
      alert("User not found or error occurred!");
    }
  };

  return (
    <div className="equipmentusagemain-chart-container">
      <h2>View Equipment Usage Chart</h2>

      <div className="equipmentusagemain-form">
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {stats.length > 0 && (
        <>
          <div className="equipmentusagemain-table-wrapper">
            <table className="equipmentusagemain-table">
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Duration (min)</th>
                  <th>Repetitions</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.equipmentName}</td>
                    <td>{stat.durationInMinutes}</td>
                    <td>{stat.repetition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="equipmentusagemain-chart-box">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={stats} barSize={70}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="equipmentName" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="durationInMinutes" fill="#00A8E8" name="Duration (min)" />
                <Bar dataKey="repetition" fill="#F77F00" name="Repetition" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default EquipmentUsageChart;
