import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewMember.css";

const ViewMember = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editedFile, setEditedFile] = useState(null);

  const [editedData, setEditedData] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    packageId: "",
    trainerId: "",
    isActive: false,
    isApproved: false,
    currentPassword: "",
    newPassword: ""
  });

  const [packages, setPackages] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchMembers(),
      fetchPackages(),
      fetchTrainers()
    ]);
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("Fetched packages:", res.data);
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Admin/trainers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTrainers(res.data);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7054/api/Admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setEditedData({
      name: member.name || "",
      phone: member.phone || "",
      email: member.email || "",
      dateOfBirth: member.dateOfBirth?.split("T")[0] || "",
      packageId: member.packageId || "",
      trainerId: member.trainerId || "",
      isActive: member.isActive || false,
      isApproved: member.isApproved || false,
      currentPassword: "",
      newPassword: ""
    });
    setEditedFile(null);
    setPreviewImage(member.imageUrl || null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(editedData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (editedFile) {
        formData.append("imageUrl", editedFile);
      }

      await axios.put(
        `https://localhost:7054/api/Admin/update-user/${editMember.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setEditMember(null);
      setEditedFile(null);
      fetchMembers();
    } catch (err) {
      console.error("Error updating member:", err);
    }
  };

  const handleCancel = () => {
    setEditMember(null);
    setEditedFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="view-member-wrapper">
      <table className="view-member-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Trainer</th>
            <th>Package</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>
                <img
                  src={member.imageUrl || "/default-avatar.png"}
                  alt={member.name}
                  className="view-member-img"
                />
              </td>
              <td>{member.phone}</td>
              <td>{member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : "N/A"}</td>
              <td>{member.email}</td>
              <td>{trainers.find((t) => t.id === member.trainerId)?.name || "N/A"}</td>
              <td>{packages.find((p) => p.id === member.packageId)?.name || "N/A"}</td>
              <td>{new Date(member.createdDate).toLocaleDateString()}</td>
              <td>
                <button className="view-member-btn edit" onClick={() => handleEdit(member)}>Edit</button>
                <button className="view-member-btn delete" onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMember && (
        <div className="view-member-edit-modal">
          <h3>Edit Member</h3>

          <label>Name:
            <input name="name" value={editedData.name} onChange={handleEditChange} />
          </label>

          <label>Phone:
            <input name="phone" value={editedData.phone} onChange={handleEditChange} />
          </label>

          <label>Email:
            <input name="email" value={editedData.email} onChange={handleEditChange} />
          </label>

          <label>Date of Birth:
            <input type="date" name="dateOfBirth" value={editedData.dateOfBirth} onChange={handleEditChange} />
          </label>

          <label>Trainer:
            <select name="trainerId" value={editedData.trainerId} onChange={handleEditChange}>
              <option value="">Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
              ))}
            </select>
          </label>

          <label>Package:
            <select name="packageId" value={editedData.packageId} onChange={handleEditChange}>
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>{pkg.packageName}</option>

              ))}
            </select>
          </label>

          <label>Is Active:
            <input type="checkbox" name="isActive" checked={editedData.isActive} onChange={handleEditChange} />
          </label>

          <label>Is Approved:
            <input type="checkbox" name="isApproved" checked={editedData.isApproved} onChange={handleEditChange} />
          </label>

          <label>Current Password:
            <input type="password" name="currentPassword" value={editedData.currentPassword} onChange={handleEditChange} />
          </label>

          <label>New Password:
            <input type="password" name="newPassword" value={editedData.newPassword} onChange={handleEditChange} />
          </label>

          <label>Change Image:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {previewImage && (
            <img src={previewImage} alt="Preview" className="view-member-img" style={{ marginTop: "10px" }} />
          )}

          <div className="edit-actions">
            <button className="view-member-btn edit" onClick={handleSave}>Save</button>
            <button className="view-member-btn delete" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMember;



////GRID


// import React, { useEffect, useState, useMemo } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { ClientSideRowModelModule } from "ag-grid-community"; 
// import axios from "axios";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "./ViewMember.css";

// const ViewMember = () => {
//   const [members, setMembers] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     await Promise.all([
//       fetchMembers(),
//       fetchPackages(),
//       fetchTrainers()
//     ]);
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Admin/users", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setMembers(res.data);
//     } catch (err) {
//       console.error("Error fetching members:", err);
//     }
//   };

//   const fetchPackages = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setPackages(res.data);
//     } catch (err) {
//       console.error("Error fetching packages:", err);
//     }
//   };

//   const fetchTrainers = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Admin/trainers", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setTrainers(res.data);
//     } catch (err) {
//       console.error("Error fetching trainers:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://localhost:7054/api/Admin/delete-user/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setMembers(prev => prev.filter(m => m.id !== id));
//     } catch (err) {
//       console.error("Error deleting member:", err);
//     }
//   };

//   const handleEdit = (member) => {
//     console.log("Edit member", member);
//   };

//   const columnDefs = useMemo(() => [
//     { headerName: "ID", field: "id", sortable: true, filter: true },
//     { headerName: "Name", field: "name", sortable: true, filter: true },
//     {
//       headerName: "Image",
//       field: "imageUrl",
//       cellRenderer: (params) => (
//         <img src={params.value || "/default-avatar.png"} alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
//       ),
//     },
//     { headerName: "Phone", field: "phone", sortable: true, filter: true },
//     {
//       headerName: "Date of Birth",
//       field: "dateOfBirth",
//       valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : "N/A"
//     },
//     { headerName: "Email", field: "email", sortable: true, filter: true },
//     {
//       headerName: "Trainer",
//       field: "trainerId",
//       valueGetter: (params) => {
//         const trainer = trainers.find(t => t.id === params.data.trainerId);
//         return trainer ? trainer.name : "N/A";
//       }
//     },
//     {
//       headerName: "Package",
//       field: "packageId",
//       valueGetter: (params) => {
//         const pack = packages.find(p => p.id === params.data.packageId);
//         return pack ? pack.name : "N/A";
//       }
//     },
//     {
//       headerName: "Joined",
//       field: "createdDate",
//       valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : "N/A"
//     },
//     {
//       headerName: "Actions",
//       cellRenderer: (params) => (
//         <div>
//           <button onClick={() => handleEdit(params.data)} className="view-member-btn edit">Edit</button>
//           <button onClick={() => handleDelete(params.data.id)} className="view-member-btn delete">Delete</button>
//         </div>
//       ),
//     }
//   ], [trainers, packages]);

//   return (
//     <div className="ag-theme-alpine" style={{ height: "700px", width: "100%" }}>
//       <AgGridReact
//         rowData={members}
//         columnDefs={columnDefs}
//         modules={[ClientSideRowModelModule]} 
//         pagination={true}
//         paginationPageSize={10}
//         domLayout="autoHeight"
//       />
//     </div>
//   );
// };

// export default ViewMember;




