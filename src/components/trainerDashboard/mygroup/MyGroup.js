import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyGroup.css';

const MyGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchGroups = async () => {
    try {
      const response = await axios.get('https://localhost:7054/api/Trainer/groups-by-trainer', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGroups(response.data);
    } catch (err) {
      setError('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="trainer-dashboard-groups-container">
      <h2>My Groups</h2>
      <table className="trainer-dashboard-groups-table">
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Package ID</th>
            <th>Package Name</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.packageId}</td>
              <td>{group.packageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyGroup;
