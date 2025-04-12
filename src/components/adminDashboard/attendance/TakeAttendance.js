// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import axios from "axios"; 
// import "./TakeAttendance.css";

// const TakeAttendance = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null); 
//   const [attendanceStatus, setAttendanceStatus] = useState(""); 
  
 
//   useEffect(() => {
//     axios.get("/api/attendance/users") 
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);
  
//   const handleAttendance = (userId) => {
//     const attendanceData = {
//       userId,
//       attendanceDate: new Date(),
//       status: attendanceStatus === "Present" ? true : false, 
//     };
    
    
//     axios.post("/api/attendance/take-attendance", attendanceData)
//       .then(response => {
//         alert("Attendance saved successfully!");
//         setSelectedUser(null); 
//       })
//       .catch(error => {
//         console.error("Error saving attendance:", error);
//         alert("Failed to save attendance.");
//       });
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Take Attendance</h1>
      

//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>User Name</th>
//             <th>Email</th>
//             <th>Take Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.fullName}</td>
//               <td>{user.email}</td>
//               <td>
//                 <button
//                   className="take-attendance-btn"
//                   onClick={() => setSelectedUser(user.id)}
//                 >
//                   <FaPlus /> 
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedUser && (
//         <div className="attendance-modal">
//           <div className="modal-content">
//             <h2>Take Attendance for User {selectedUser}</h2>
            
//             <div>
//               <label>
//                 Status:
//                 <select
//                   value={attendanceStatus}
//                   onChange={(e) => setAttendanceStatus(e.target.value)}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                 </select>
//               </label>
//             </div>

//             <div className="modal-actions">
//               <button onClick={() => handleAttendance(selectedUser)}>Save Attendance</button>
//               <button onClick={() => setSelectedUser(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TakeAttendance;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import "./TakeAttendance.css"; // Üslub faylını əlavə etmisinizsə

const TakeAttendance = () => {
  const [users, setUsers] = useState([]); // İstifadəçilərin siyahısı
  const [selectedUser, setSelectedUser] = useState(null); // Seçilmiş istifadəçi
  const [modalOpen, setModalOpen] = useState(false); // Modalın açılıb- bağlanma vəziyyəti
  const [date, setDate] = useState(""); // Tarix
  const [status, setStatus] = useState("Present"); // İştirak statusu (Hüzurda/Absensiya)

  useEffect(() => {
    // API-dən istifadəçiləri çəkirik
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/top-users"); // Serverdən istifadəçiləri alırıq
        setUsers(response.data); // Gələn məlumatları istifadəçilər listəsinə əlavə edirik
      } catch (err) {
        console.error("Error fetching users:", err); // Xətanı log edirik
      }
    };

    fetchUsers(); // İstifadəçiləri yükləmək üçün funksiyanı çağırırıq
  }, []); // Componentin bir dəfə yüklənməsi üçün boş array istifadə edirik

  const handleTakeAttendanceClick = (user) => {
    setSelectedUser(user); // İstifadəçini seçirik
    setModalOpen(true); // Modalı açırıq
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Formanın təkrardan yüklənməsinin qarşısını alırıq

    const dto = {
      userId: selectedUser.id,
      attendanceDate: date,
      status, // Hüzurda ya da Absensiya statusunu göndəririk
    };

    try {
      // İştirak vəziyyətini göndəririk
      await axios.post("/api/attendance/take-attendance", dto);
      alert("Attendance saved successfully"); // Uğurlu nəticə
      setModalOpen(false); // Modalı bağlayırıq
    } catch (err) {
      console.error("Error saving attendance:", err); // Xətanı log edirik
      alert("Error saving attendance"); // Xəta mesajı
    }
  };

  return (
    <div className="container mt-5">
      <h2>Member Attendance</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.point}</td>
              <td>
                <button className="btn btn-outline-primary" onClick={() => handleTakeAttendanceClick(user)}>
                  <FaPlus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal açıldığında, seçim edilmiş user ilə form göstərilir */}
      {modalOpen && selectedUser && (
        <div className="modal-backdrop">
          <div className="modal-content p-4">
            <h4>Take Attendance for {selectedUser.name}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success me-2">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeAttendance;
