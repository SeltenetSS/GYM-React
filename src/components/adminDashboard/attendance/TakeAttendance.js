import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TakeAttendance.css";

const TakeAttendance = () => {
  const [users, setUsers] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusMap, setStatusMap] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login again.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get(
          "https://localhost:7054/api/Attendance/get-attendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please login again.");
          window.location.href = "/login";
        } else {
          setError("Failed to load attendance data. Security issue.");
        }
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = (userId, status) => {
    setStatusMap((prev) => ({ ...prev, [userId]: status }));
  };

  const handleSubmit = async (userId) => {
    const status = statusMap[userId] || "Present";

    const attendanceData = {
      userId,
      status: status === "Present" ? 1 : 0,
      attendanceDate,
    };

    try {
      await axios.post(
        "https://localhost:7054/api/Attendance/take-attendance",
        attendanceData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error response:", error.response);
      alert(
        `An error occurred: ${
          error.response?.data?.message || "No additional information available."
        }`
      );
    }
  };

  return (
    <div className="takeAttendanceContainer">
      <h3 className="takeAttendanceHeader">Take Attendance</h3>

      {error && <div className="takeAttendanceError">{error}</div>}

      <div className="takeAttendanceFormGroup">
        <label>Date:</label>
        <DatePicker
          selected={new Date(attendanceDate)}
          onChange={(date) =>
            setAttendanceDate(date.toISOString().split("T")[0])
          }
          dateFormat="yyyy-MM-dd"
          className="takeAttendanceDatePicker"
        />
      </div>

      <table className="takeAttendanceTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Package</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={
                    user.imageUrl || "https://example.com/default-avatar.png"
                  }
                  alt={user.name}
                  className="takeAttendanceImage"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.packageName}</td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  defaultValue="Present"
                  className="takeAttendanceSelect"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td>
                <button
                  className="takeAttendanceButton"
                  onClick={() => handleSubmit(user.id)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TakeAttendance;
