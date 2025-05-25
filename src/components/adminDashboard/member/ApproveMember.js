

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaCheckCircle, FaTrash } from "react-icons/fa";
// import './ApproveMember.css'; // Change to a regular CSS file

// const ApproveMember = () => {
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchPendingUsers();
//   }, []);

//   const fetchPendingUsers = async () => {
//     try {
//       const response = await axios.get("https://localhost:7054/api/Admin/pending-users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setPendingUsers(response.data || []);
//       setMessage(""); 
//     } catch (error) {
//       console.error("Error fetching pending users:", error);
//       setPendingUsers([]);
//       setMessage("No pending members found.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (userId) => {
//     try {
//       await axios.post(`https://localhost:7054/api/Admin/approve-user/${userId}`, null, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setPendingUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//       setMessage("Member approved successfully!");
//     } catch (error) {
//       setMessage("An error occurred while approving the member.");
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (userId) {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setMessage("User is not authorized!");
//           return;
//         }

//         const response = await axios.post(`https://localhost:7054/api/Admin/decline-user/${userId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           await fetchPendingUsers();
//           setMessage("Member deleted successfully!");
//         }
//       } catch (error) {
//         console.error(error);
//         setMessage("An error occurred while deleting the member.");
//       }
//     }
//   };

//   return (
//     <div className="approve-container">
//       <h2 className="approve-title">Approve or Reject New Gym-Gear Members</h2>
//       {loading ? (
//         <p className="loading-text">Loading...</p>
//       ) : pendingUsers.length === 0 ? (
//         <p className="no-pending-text">No pending members to approve.</p>
//       ) : (
//         <ul className="approve-user-list">
//           {pendingUsers.map((user) => (
//             <li key={user.id} className="approve-user-card">
//               <div className="user-info">
//                 <strong>{user.fullName}</strong> ({user.userName})
//               </div>
//               <div className="button-group">
//                 <button
//                   className="approve-button"
//                   onClick={() => handleApprove(user.id)}
//                 >
//                   <FaCheckCircle /> Approve
//                 </button>
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(user.id)}
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       {message && <p className="approve-message">{message}</p>}
//     </div>
//   );
// };

// export default ApproveMember;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import './ApproveMember.css'; 

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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPendingUsers(response.data || []);
      setMessage("");
    } catch (error) {
      setPendingUsers([]);
      setMessage("No pending members found.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.post(`https://localhost:7054/api/Admin/approve-user/${userId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      setMessage("Member approved successfully!");
    } catch {
      setMessage("Error approving member.");
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User is not authorized!");
        return;
      }

      const res = await axios.post(`https://localhost:7054/api/Admin/decline-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        await fetchPendingUsers();
        setMessage("Member deleted successfully!");
      }
    } catch {
      setMessage("Error deleting member.");
    }
  };

  return (
    <div className="approve-wrapper">
  <h2>Approve or Reject New Gym-Gear Members</h2>

  {loading ? (
    <p className="approve-loading-text">Loading...</p>
  ) : pendingUsers.length === 0 ? (
    <p className="approve-message">No pending members to approve.</p>
  ) : (
    <table className="approve-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pendingUsers.map(user => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.userName}</td>
            <td className="approve-action-buttons">
              <button
                className="approve-action-icon edit"
                title="Approve"
                onClick={() => handleApprove(user.id)}
              >
                <FaCheckCircle />
              </button>
              <button
                className="approve-action-icon delete"
                title="Delete"
                onClick={() => handleDelete(user.id)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {message && <p className="approve-message">{message}</p>}
</div>

  );
};

export default ApproveMember;
