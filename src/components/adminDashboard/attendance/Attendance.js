import React from "react";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./Attendance.css";

const Attendance = () => {
  const history = useHistory();

  const handleTakeAttendance = () => history.push("/admin-dashboard/attendance/take-attendance");
  const handleViewAttendance = () => history.push("/admin-dashboard/attendance/view-attendance");

  return (
    <div className="adminAttendanceCardsContainer">
      <div className="adminAttendanceCard" onClick={handleTakeAttendance}>
        <div className="adminAttendanceCardIcon">
          <FaCheckCircle size={30} />
        </div>
        <div className="adminAttendanceCardTitle">Take Attendance</div>
      </div>

      <div className="adminAttendanceCard" onClick={handleViewAttendance}>
        <div className="adminAttendanceCardIcon">
          <FaEye size={30} />
        </div>
        <div className="adminAttendanceCardTitle">View Attendance</div>
      </div>
    </div>
  );
};

export default Attendance;
