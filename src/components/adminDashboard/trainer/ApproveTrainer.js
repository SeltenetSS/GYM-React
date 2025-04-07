import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ApproveTrainer.module.css";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const ApproveTrainer = () => {
  const [pendingTrainers, setPendingTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPendingTrainers();
  }, []);

  const fetchPendingTrainers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Admin/pending-trainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingTrainers(response.data || []);
      setMessage("");
    } catch (error) {
      console.error("Error fetching pending trainers:", error);
      setPendingTrainers([]);
      setMessage("No pending trainers found.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (trainerId) => {
    try {
      await axios.post(`https://localhost:7054/api/Admin/approve-trainer/${trainerId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingTrainers((prev) => prev.filter((trainer) => trainer.id !== trainerId));
      setMessage("Trainer approved successfully!");
    } catch (error) {
      setMessage("An error occurred while approving the trainer.");
    }
  };

  const handleDelete = async (trainerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User is not authorized!");
        return;
      }

      const response = await axios.post(`https://localhost:7054/api/Admin/decline-trainer/${trainerId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await fetchPendingTrainers();
        setMessage("Trainer deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the trainer.");
    }
  };

  return (
    <div className={styles.approveTrainerContainer}>
      <h2 className={styles.approveTrainerTitle}>Approve or Reject Trainer Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingTrainers.length === 0 ? (
        <p>No pending trainers to approve.</p>
      ) : (
        <ul className={styles.approveTrainerList}>
          {pendingTrainers.map((trainer) => (
            <li key={trainer.id} className={styles.approveTrainerCard}>
              <div>
                <strong>{trainer.fullName}</strong> ({trainer.userName})
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.approveButton}
                  onClick={() => handleApprove(trainer.id)}
                >
                  <FaCheckCircle /> Approve
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(trainer.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {message && <p className={styles.approveMessage}>{message}</p>}
    </div>
  );
};

export default ApproveTrainer;
