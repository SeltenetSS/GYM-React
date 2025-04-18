// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Member.css';

// const Member = () => {
//   const [members, setMembers] = useState([]);
//   const [editMember, setEditMember] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);


//   useEffect(() => {
//     fetchMembers()
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get('https://localhost:7054/api/TrainerUser/my-users', {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       console.log(response.data); // Konsolda gələn məlumatı yoxlayın
//       setMembers(response.data);
//     } catch (err) {
//       console.error("Error fetching members:", err);
//     }
//   };
  

//   const handleDelete = async (id) => {
//     if (!window.confirm('Əminsinizmi?')) return;

//     try {
//       await axios.delete(`https://localhost:7054/api/TrainerUser/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setMembers(members.filter((m) => m.id !== id));
//     } catch (err) {
//       console.error("Error deleting member:", err);
//     }
//   };


//   const handleEdit = (member) => {
//     setEditMember(member);
//     setModalOpen(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`https://localhost:7054/api/TrainerUser/${editMember.id}`, editMember);
//       setModalOpen(false);
//       fetchMembers();
//     } catch (error) {
//       console.error('Error updating member:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   return (
//     <div className="member-container">
//       <h2>Üzvlər Siyahısı</h2>
//       <table className="member-table">
//         <thead>
//           <tr>
//             <th>Ad</th>
//             <th>Email</th>
//             <th>Telefon</th>
//             <th>Doğum Tarixi</th>
//             <th>Paket</th>
//             <th>Əməliyyatlar</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member) => (
//             <tr key={member.id}>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phone}</td>
//               <td>{member.dateOfBirth?.substring(0, 10)}</td>
//               <td>{member.packageName}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(member)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>İstifadəçini Redaktə Et</h3>
//             <input
//               type="text"
//               placeholder="Ad"
//               value={editMember.name}
//               onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={editMember.email}
//               onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Telefon"
//               value={editMember.phone}
//               onChange={(e) => setEditMember({ ...editMember, phone: e.target.value })}
//             />
//             <button className="save-btn" onClick={handleUpdate}>Yadda saxla</button>
//             <button className="close-btn" onClick={() => setModalOpen(false)}>Bağla</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Member;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Member.css';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []); // Component mount olduqda fetchMembers çağırılır
  
  const fetchMembers = async () => {
    try {
      const response = await axios.get('https://localhost:7054/api/TrainerUser/my-users', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log(response.data); // Verilənləri konsolda yoxla
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('Əminsinizmi?')) return;

    try {
      await axios.delete(`https://localhost:7054/api/TrainerUser/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://localhost:7054/api/TrainerUser/${editMember.id}`, editMember);
      setModalOpen(false);
      fetchMembers(); // Refetch the members list after update
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="member-container">
      <h2>Üzvlər Siyahısı</h2>
      {members.length === 0 ? (
        <p>No members available.</p> // Display a message if no members are available
      ) : (
        <table className="member-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Doğum Tarixi</th>
              <th>Paket</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
  {members && members.length > 0 ? (
    members.map((member) => (
      <tr key={member.id}>
        <td>{member.name}</td>
        <td>{member.email}</td>
        <td>{member.phone}</td>
        <td>{member.dateOfBirth?.substring(0, 10)}</td>
        <td>{member.packageName}</td>
        <td>
          <button className="edit-btn" onClick={() => handleEdit(member)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="6">No members found</td></tr>
  )}
</tbody>

        </table>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>İstifadəçini Redaktə Et</h3>
            <input
              type="text"
              placeholder="Ad"
              value={editMember.name}
              onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={editMember.email}
              onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefon"
              value={editMember.phone}
              onChange={(e) => setEditMember({ ...editMember, phone: e.target.value })}
            />
            <button className="save-btn" onClick={handleUpdate}>Yadda saxla</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>Bağla</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
