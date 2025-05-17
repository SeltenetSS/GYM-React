import React, { useState } from 'react';
import axios from 'axios';
import './AddUsage.css';

const AddUsage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    equipmentId: '',
    durationInMinutes: '',
    repetition: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // JWT token burada saxlanılır

    if (!token) {
      alert('Token tapılmadı. Zəhmət olmasa login olun.');
      return;
    }

    try {
      await axios.post(
        'https://localhost:7054/api/UserEquipmentUsage',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // token əlavə olunur
          },
        }
      );
      alert('Usage data saved and points updated.');
      setFormData({
        userId: '',
        equipmentId: '',
        durationInMinutes: '',
        repetition: '',
        date: '',
      });
    } catch (error) {
      alert('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="add-usage-form">
      <h2>Add Equipment Usage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="equipmentId"
          placeholder="Equipment ID"
          value={formData.equipmentId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="durationInMinutes"
          placeholder="Duration (minutes)"
          value={formData.durationInMinutes}
          onChange={handleChange}
        />
        <input
          type="number"
          name="repetition"
          placeholder="Repetitions"
          value={formData.repetition}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit">Submit Usage</button>
      </form>
    </div>
  );
};

export default AddUsage;
