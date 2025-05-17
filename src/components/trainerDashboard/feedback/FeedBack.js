import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedBack.css';

const FeedBack = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [comment, setComment] = useState('');
  const [isPositive, setIsPositive] = useState(true);
  const [message, setMessage] = useState('');

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://localhost:7054/api/TrainerUser/my-users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Gelen telebeler:", response.data);
      setUsers(response.data); // Əgər burda response.data.data lazımdırsa dəyiş
    } catch (error) {
      console.error('Tələbələr yüklənə bilmədi:', error);
    }
  };

  fetchUsers();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      userId: parseInt(selectedUserId),
      comment,
      isPositive
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post('https://localhost:7054/api/TrainerFeedback', feedback, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Feedback uğurla göndərildi!');
      setComment('');
      setSelectedUserId('');
      setIsPositive(true);
    } catch (error) {
      console.error('Feedback göndərilmədi:', error);
      setMessage('Xəta baş verdi!');
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback Göndər</h2>
      {message && <div className="feedback-message">{message}</div>}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userSelect">Tələbə seçin:</label>
          <select
            id="userSelect"
            className="feedback-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Tələbə seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="feedbackComment">Feedback:</label>
          <textarea
            id="feedbackComment"
            className="feedback-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="feedbackType">Tip:</label>
          <select
            id="feedbackType"
            className="feedback-type-select"
            value={isPositive ? 'positive' : 'negative'}
            onChange={(e) => setIsPositive(e.target.value === 'positive')}
          >
            <option value="positive">Pozitiv</option>
            <option value="negative">Neqativ</option>
          </select>
        </div>

        <button type="submit" className="feedback-submit-button">
          Göndər
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
