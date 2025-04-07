
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ApproveMember.module.css";
import { FaCheckCircle, FaTrash } from "react-icons/fa"; 

const ApproveMember = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPendingUsers();
  }, []);

 
  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Admin/pending-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingUsers(response.data || []);
      setMessage(""); 
    } catch (error) {
      console.error("Error fetching pending users:", error);
      setPendingUsers([]); 
      setMessage("No pending members found.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleApprove = async (userId) => {
    try {
      await axios.post(`https://localhost:7054/api/Admin/approve-user/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setMessage("Member approved successfully!");
    } catch (error) {
      setMessage("An error occurred while approving the member.");
    }
  };



  
  const handleDelete = async (userId) => {
    if (userId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("User is not authorized!");
          return;
        }
  
       
        const response = await axios.post(`https://localhost:7054/api/Admin/decline-user/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
    
        if (response.status === 200) {
    
          await fetchPendingUsers();
          setMessage("Member deleted successfully!");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred while deleting the member.");
      }
    }
  };
  
  
  return (
    <div className={styles.approveContainer}>
      <h2 className={styles.approveTitle}>Approve or Reject New Gym-Gear Members</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending members to approve.</p>
      ) : (
        <ul className={styles.approveUserList}>
          {pendingUsers.map((user) => (
            <li key={user.id} className={styles.approveUserCard}>
              <div>
                <strong>{user.fullName}</strong> ({user.userName})
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.approveButton}
                  onClick={() => handleApprove(user.id)}
                >
                  <FaCheckCircle /> Approve
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(user.id)}
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

export default ApproveMember;
