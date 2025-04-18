// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewTrainer.css";

// const ViewTrainer = () => {
//   const [trainers, setTrainers] = useState([]);
//   const [editTrainer, setEditTrainer] = useState(null);
//   const [editedData, setEditedData] = useState({
//     name: "",
//     email: "",
//     experience: "",
//     mobileTelephone: "",
//     salary: "",
//     imageUrl: null,
//   });

//   useEffect(() => {
//     fetchTrainers();
//   }, []);

//   const fetchTrainers = async () => {
//     try {
//       const response = await axios.get("https://localhost:7054/api/Admin/trainers", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setTrainers(response.data);
//     } catch (error) {
//       console.error("Error fetching trainers:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (id) {
//       try {
//         await axios.delete(`https://localhost:7054/api/Admin/delete-trainer/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setTrainers((prev) => prev.filter((t) => t.id !== id));
//       } catch (error) {
//         console.error("Error deleting trainer:", error);
//       }
//     }
//   };

//   const handleEdit = (trainer) => {
//     setEditTrainer(trainer);
//     setEditedData({
//       name: trainer.name || "",
//       email: trainer.email || "",
//       experience: trainer.experience || "",
//       mobileTelephone: trainer.mobileTelephone || "",
//       salary: trainer.salary || "",
//       imageUrl: trainer.imageUrl || null,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setEditedData({ ...editedData, imageUrl: e.target.files[0] });
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", editedData.name);
//       formData.append("email", editedData.email);
//       formData.append("experience", editedData.experience);
//       formData.append("mobileTelephone", editedData.mobileTelephone);
//       formData.append("salary", editedData.salary);
//       if (editedData.imageUrl) {
//         formData.append("imageUrl", editedData.imageUrl);
//       }

//       await axios.put(`https://localhost:7054/api/Admin/update-trainer/${editTrainer.id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setEditTrainer(null);
//       fetchTrainers();
//     } catch (error) {
//       console.error("Error updating trainer:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditTrainer(null);
//   };

//   return (
//     <div className="view-trainer-wrapper">
//       <table className="view-trainer-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Experience</th>
//             <th>Mobile</th>
//             <th>Salary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainers.map((trainer) => (
//             <tr key={trainer.id}>
//               <td>{trainer.id}</td>
//               <td>
//                 <img
//                   src={trainer.imageUrl || "default-avatar.png"}
//                   alt={trainer.name}
//                   className="view-trainer-img"
//                 />
//               </td>
//               <td>{trainer.name}</td>
//               <td>{trainer.email}</td>
//               <td>{trainer.experience}</td>
//               <td>{trainer.mobileTelephone}</td>
//               <td>{trainer.salary}</td>
            
//               <td>
//                 <button className="view-trainer-btn edit" onClick={() => handleEdit(trainer)}>Edit</button>
//                 <button className="view-trainer-btn delete" onClick={() => handleDelete(trainer.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editTrainer && (
//         <div className="view-trainer-edit-modal">
//           <h3>Edit Trainer</h3>
//           <label>Name: <input name="name" value={editedData.name} onChange={handleEditChange} /></label>
//           <label>Email: <input name="email" value={editedData.email} onChange={handleEditChange} /></label>
//           <label>Experience: <input name="experience" value={editedData.experience} onChange={handleEditChange} /></label>
//           <label>Mobile Telephone: <input name="mobileTelephone" value={editedData.mobileTelephone} onChange={handleEditChange} /></label>
//           <label>Salary: <input name="salary" type="number" value={editedData.salary} onChange={handleEditChange} /></label>
//           <label>Image: <input type="file" onChange={handleImageChange} /></label>
//           <div style={{ marginTop: "15px" }}>
//             <button className="view-trainer-btn edit" onClick={handleSave}>Save</button>
//             <button className="view-trainer-btn delete" onClick={handleCancel}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewTrainer;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTrainer.css";

const ViewTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [editTrainer, setEditTrainer] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    experience: "",
    mobileTelephone: "",
    salary: "",
    speciality: "",
    description: "",
    isActive: false,
    isApproved: false,
    currentPassword: "",
    newPassword: "",
    imageUrl: null,
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Admin/trainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7054/api/Admin/delete-trainer/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrainers((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const handleEdit = (trainer) => {
    setEditTrainer(trainer);
    setEditedData({
      name: trainer.name || "",
      email: trainer.email || "",
      experience: trainer.experience || "",
      mobileTelephone: trainer.mobileTelephone || "",
      salary: trainer.salary || "",
      speciality: trainer.speciality || "",
      description: trainer.description || "",
      isActive: trainer.isActive || false,
      isApproved: trainer.isApproved || false,
      currentPassword: "",
      newPassword: "",
      imageUrl: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedData({
      ...editedData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setEditedData({ ...editedData, imageUrl: e.target.files[0] });
  };
  const handleSave = async () => {
   
    if (editedData.newPassword && !editedData.currentPassword) {
      alert("Şifrəni dəyişmək üçün əvvəlki şifrəni daxil etməlisiniz.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", editedData.name);
      formDataToSend.append("email", editedData.email);
      formDataToSend.append("experience", editedData.experience);
      formDataToSend.append("mobileTelephone", editedData.mobileTelephone);
      formDataToSend.append("salary", editedData.salary);
      formDataToSend.append("speciality", editedData.speciality);
      formDataToSend.append("description", editedData.description);
      formDataToSend.append("isActive", editedData.isActive);
      formDataToSend.append("isApproved", editedData.isApproved);
      formDataToSend.append("currentPassword", editedData.currentPassword);
      formDataToSend.append("newPassword", editedData.newPassword);
  
      if (editedData.imageUrl) {
        formDataToSend.append("imageUrl", editedData.imageUrl);
      }
  
      await axios.put(`https://localhost:7054/api/Admin/update-trainer/${editTrainer.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      alert("Məşqçi məlumatları uğurla yeniləndi.");
      setEditTrainer(null); // Modalı bağla
      fetchTrainers(); // Siyahını yenilə
    } catch (error) {
      console.error("Error updating trainer:", error);
      alert("Yeniləmə zamanı xəta baş verdi.");
    }
  };
  

  const handleCancel = () => {
    setEditTrainer(null);
  };

  return (
    <div className="view-trainer-wrapper">
      <table className="view-trainer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Mobile</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.id}</td>
              <td>
                <img
                  src={trainer.imageUrl || "default-avatar.png"}
                  alt={trainer.name}
                  className="view-trainer-img"
                />
              </td>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.experience}</td>
              <td>{trainer.mobileTelephone}</td>
              <td>{trainer.salary}</td>
              <td>
                <button className="view-trainer-btn edit" onClick={() => handleEdit(trainer)}>Edit</button>
                <button className="view-trainer-btn delete" onClick={() => handleDelete(trainer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTrainer && (
        <div className="view-trainer-edit-modal">
          <h3>Edit Trainer</h3>
          <label>Name: <input name="name" value={editedData.name} onChange={handleEditChange} /></label>
          <label>Email: <input name="email" value={editedData.email} onChange={handleEditChange} /></label>
          <label>Experience: <input name="experience" value={editedData.experience} onChange={handleEditChange} /></label>
          <label>Mobile: <input name="mobileTelephone" value={editedData.mobileTelephone} onChange={handleEditChange} /></label>
          <label>Salary: <input type="number" name="salary" value={editedData.salary} onChange={handleEditChange} /></label>
          <label>Speciality: <input name="speciality" value={editedData.speciality} onChange={handleEditChange} /></label>
          <label>Description: <textarea name="description" value={editedData.description} onChange={handleEditChange} /></label>
          <label>
            Active:
            <input type="checkbox" name="isActive" checked={editedData.isActive} onChange={handleEditChange} />
          </label>
          <label>
            Approved:
            <input type="checkbox" name="isApproved" checked={editedData.isApproved} onChange={handleEditChange} />
          </label>
          <label>Current Password: <input type="password" name="currentPassword" value={editedData.currentPassword} onChange={handleEditChange} /></label>
          <label>New Password: <input type="password" name="newPassword" value={editedData.newPassword} onChange={handleEditChange} /></label>
          <label>Image: <input type="file" onChange={handleImageChange} /></label>

          <div style={{ marginTop: "15px" }}>
            <button className="view-trainer-btn edit" onClick={handleSave}>Save</button>
            <button className="view-trainer-btn delete" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTrainer;
