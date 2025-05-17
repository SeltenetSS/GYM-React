import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainerScheduleCreate.css';

const daysMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const TrainerScheduleCreate = () => {
  const [form, setForm] = useState({
    trainerId: '',
    userId: '',
    groupId: '',
    dayOfWeek: 'Monday',
    startTime: { hour: 9, minute: 0 },
    endTime: { hour: 10, minute: 0 },
    description: ''
  });

  const [trainers, setTrainers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Məlumatları yüklə
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainersRes, usersRes, groupsRes] = await Promise.all([
          axios.get('https://localhost:7054/api/Admin/trainers'),
          axios.get('https://localhost:7054/api/Admin/users'),
          axios.get('https://localhost:7054/api/Group/all-groups')
        ]);
        setTrainers(trainersRes.data);
        setUsers(usersRes.data);
        setGroups(groupsRes.data);
      } catch (err) {
        setError('Məlumatlar yüklənərkən xəta baş verdi.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('startTime.') || name.startsWith('endTime.')) {
      const [timePart, field] = name.split('.');
      setForm(prev => ({
        ...prev,
        [timePart]: {
          ...prev[timePart],
          [field]: parseInt(value)
        }
      }));
    } else {
      // Əgər userId seçilirsə, groupId-ni sıfırla
      if (name === 'userId') {
        setForm(prev => ({
          ...prev,
          userId: value,
          groupId: ''
        }));
      }
      // Əgər groupId seçilirsə, userId-ni sıfırla
      else if (name === 'groupId') {
        setForm(prev => ({
          ...prev,
          groupId: value,
          userId: ''
        }));
      } else {
        setForm(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const hasUserId = form.userId !== '';
    const hasGroupId = form.groupId !== '';

    if (hasUserId === hasGroupId) {
      setError('Yalnız User və ya Group seçilməlidir.');
      return;
    }

    try {
      const payload = {
        trainerId: parseInt(form.trainerId),
        userId: hasUserId ? parseInt(form.userId) : null,
        groupId: hasGroupId ? parseInt(form.groupId) : null,
        dayOfWeek: daysMap[form.dayOfWeek],
        startTime: {
          hour: parseInt(form.startTime.hour),
          minute: parseInt(form.startTime.minute)
        },
        endTime: {
          hour: parseInt(form.endTime.hour),
          minute: parseInt(form.endTime.minute)
        },
        description: form.description
      };

      await axios.post('https://localhost:7054/api/TrainerSchedule', payload);

      setSuccess('Cədvəl uğurla yaradıldı!');
      setForm({
        trainerId: '',
        userId: '',
        groupId: '',
        dayOfWeek: 'Monday',
        startTime: { hour: 9, minute: 0 },
        endTime: { hour: 10, minute: 0 },
        description: ''
      });
    } catch (err) {
      const errorData = err.response?.data;
      let errorMsg = 'Xəta baş verdi.';
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMsg = errorData;
        } else if (errorData.title) {
          errorMsg = errorData.title;
        } else if (errorData.message) {
          errorMsg = errorData.message;
        } else if (typeof errorData === 'object') {
          errorMsg = JSON.stringify(errorData);
        }
      }
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="createschedule-form">
      <h2 className="createschedule-title">Trainer Schedule Create</h2>

      <label className="createschedule-label">
        Trainer:
        <select
          name="trainerId"
          value={form.trainerId}
          onChange={handleChange}
          required
          className="createschedule-select"
        >
          <option value="">Seçin</option>
          {trainers.map(trainer => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
      </label>

      <label className="createschedule-label">
        User (optional):
        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          disabled={form.groupId !== ''}
          className="createschedule-select"
        >
          <option value="">Seçin</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <label className="createschedule-label">
        Group (optional):
        <select
          name="groupId"
          value={form.groupId}
          onChange={handleChange}
          disabled={form.userId !== ''}
          className="createschedule-select"
        >
          <option value="">Seçin</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>

      <label className="createschedule-label">
        Day of Week:
        <select
          name="dayOfWeek"
          value={form.dayOfWeek}
          onChange={handleChange}
          className="createschedule-select"
        >
          {Object.keys(daysMap).map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </label>

      <label className="createschedule-label">
        Start Time:
        <input
          type="number"
          name="startTime.hour"
          value={form.startTime.hour}
          min={0}
          max={23}
          onChange={handleChange}
          required
          className="createschedule-time-input"
        />
        :
        <input
          type="number"
          name="startTime.minute"
          value={form.startTime.minute}
          min={0}
          max={59}
          onChange={handleChange}
          required
          className="createschedule-time-input"
        />
      </label>

      <label className="createschedule-label">
        End Time:
        <input
          type="number"
          name="endTime.hour"
          value={form.endTime.hour}
          min={0}
          max={23}
          onChange={handleChange}
          required
          className="createschedule-time-input"
        />
        :
        <input
          type="number"
          name="endTime.minute"
          value={form.endTime.minute}
          min={0}
          max={59}
          onChange={handleChange}
          required
          className="createschedule-time-input"
        />
      </label>

      <label className="createschedule-label">
        Description:
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="createschedule-textarea"
        />
      </label>

      <button type="submit" className="createschedule-button">Yarat</button>

      {error && <p className="createschedule-error">{error}</p>}
      {success && <p className="createschedule-success">{success}</p>}
    </form>
  );
};

export default TrainerScheduleCreate;
