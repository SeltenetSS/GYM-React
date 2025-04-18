


import React, { useEffect, useState } from "react";
import axios from "axios";
import AttendanceModal from "./AttendanceModal";
import "./ViewAttendance.css";

const ViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userAttendance, setUserAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAttendanceList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7054/api/Attendance/get-attendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendanceList(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchAttendanceList();
  }, []);

  const fetchUserAttendance = async (userId) => {
    try {
      setAttendanceLoading(true);
      setSelectedUserId(userId);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://localhost:7054/api/Attendance/user-attendance/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAttendance(response.data);
      setAttendanceLoading(false);
      setIsModalOpen(true); 
    } catch (err) {
      console.error("Error fetching user attendance history:", err);
      setAttendanceLoading(false);
    }
  };

  return (
    <div className="view-attendance-container">
      <h2>Attendance List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <table className="attendance-table">
            <thead>
              <tr>
              <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Package</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((user) => (
                <tr key={user.id}>
                   <td>{user.id}</td>
                  <td>
                    <img
                      src={user.imageUrl || "https://via.placeholder.com/50"}
                      alt={user.name}
                      className="user-image"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>{user.packageName || "N/A"}</td>
                  <td>
                    <button onClick={() => fetchUserAttendance(user.id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal window */}
          {isModalOpen && (
            <AttendanceModal
              userAttendance={userAttendance}
              onClose={() => setIsModalOpen(false)}
              loading={attendanceLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ViewAttendance;
