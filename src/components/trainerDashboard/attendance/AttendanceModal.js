import React from "react";
import "./AttendanceModal.css";

const AttendanceModal = ({ userAttendance, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>User Attendance History</h3>
          <button className="close-btn" onClick={onClose} title="Close">
            &times;
          </button>
        </div>
        {userAttendance.length === 0 ? (
          <p>This user has no attendance data.</p>
        ) : (
          <table className="user-attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAttendance.map((att, index) => (
                <tr key={index}>
                  <td>{new Date(att.attendanceDate).toLocaleDateString()}</td>
                  <td>{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceModal;
