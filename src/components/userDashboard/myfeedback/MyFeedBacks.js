import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyFeedBacks.css';

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://localhost:7054/api/UserFeedback', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(response.data);
      } catch (err) {
        setError("Feedback-lər yüklənə bilmədi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="review-container">
      <h2 className="review-title">Reviews</h2>

      {feedbacks.length === 0 ? (
        <p className="review-no-feedback">Heç bir feedback yoxdur.</p>
      ) : (
        feedbacks.map(fb => (
          <div key={fb.id} className="review-card">
            <div className="review-header">
  <span className="review-trainer">
    <strong>Trainer:</strong> {fb.trainerFullName}
  </span>
  <span className="review-date">{new Date(fb.givenAt).toLocaleDateString()}</span>
</div>

            <div className="review-comment">
              {fb.comment}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyFeedbacks;
