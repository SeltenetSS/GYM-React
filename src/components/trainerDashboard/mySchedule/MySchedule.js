

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MySchedule.css';

const MySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('https://localhost:7054/api/TrainerSchedule/myschedules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSchedules(response.data);
    } catch (err) {
      setError('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="schedule-container">
      <h2>My Schedules</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Trainer Name</th>
            <th>Group Name</th>
            <th>User Name</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="schedule-table2">
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.trainerName}</td>
              <td>{schedule.groupName || 'N/A'}</td>
              <td>{schedule.userName || 'N/A'}</td>
              <td>{schedule.dayOfWeek}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.description || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySchedules;
