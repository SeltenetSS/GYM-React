




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewMember.css";
import "react-datepicker/dist/react-datepicker.css";

const ViewMember = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editedFile, setEditedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    try {
      await Promise.all([fetchMembers(), fetchPackages(), fetchTrainers()]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
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

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
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
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`https://localhost:7054/api/Admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMembers((prev) => prev.filter((m) => m.id !== id));
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
      dateOfBirth: member.dateOfBirth ? member.dateOfBirth.split("T")[0] : "",
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
    setEditedData((prev) => ({
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
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
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
      setPreviewImage(null);
      await fetchMembers();
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
        <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="search-input"
         />
         <span className="search-icon">&#128269;</span> 
       </div>
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
          {filteredMembers.map((member) => (
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
              <td>{packages.find((p) => p.id === member.packageId)?.packageName || "N/A"}</td>
              <td>{member.createdDate ? new Date(member.createdDate).toLocaleDateString() : "N/A"}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-icon edit"
                    onClick={() => handleEdit(member)}
                    title="Edit"
                  />
                  <button
                    className="action-icon delete"
                    onClick={() => handleDelete(member.id)}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMember && (
        <>
          <div className="modal-overlay" onClick={handleCancel} />
          <div
            className="view-member-edit-modal centered-modal"
            role="dialog"
            aria-modal="true"
          >
            <h3>Edit Member</h3>

            <label>
              Name:
              <input
                name="name"
                value={editedData.name}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Phone:
              <input
                name="phone"
                value={editedData.phone}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Email:
              <input
                name="email"
                value={editedData.email}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={editedData.dateOfBirth}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Trainer:
              <select
                name="trainerId"
                value={editedData.trainerId}
                onChange={handleEditChange}
              >
                <option value="">Select Trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Package:
              <select
                name="packageId"
                value={editedData.packageId}
                onChange={handleEditChange}
              >
                <option value="">Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.packageName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Is Active:
              <input
                type="checkbox"
                name="isActive"
                checked={editedData.isActive}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Is Approved:
              <input
                type="checkbox"
                name="isApproved"
                checked={editedData.isApproved}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Current Password:
              <input
                type="password"
                name="currentPassword"
                value={editedData.currentPassword}
                onChange={handleEditChange}
              />
            </label>

            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={editedData.newPassword}
                onChange={handleEditChange}
              />
            </label>

            <label>
              Change Image:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="view-member-img"
                style={{ marginTop: "10px" }}
              />
            )}

            <div className="edit-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMember;



