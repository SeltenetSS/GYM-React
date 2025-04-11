import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewMember.css";

const ViewMember = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: ""
  });
  const [editedFile, setEditedFile] = useState(null); // şəkil üçün ayrıca state

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await axios.delete(`https://localhost:7054/api/Admin/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setEditedData({
      name: member.name || "",
      phone: member.phone || "",
      email: member.email || "",
      dateOfBirth: member.dateOfBirth?.split("T")[0] || ""
    });
    setEditedFile(null); 
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("phone", editedData.phone);
      formData.append("email", editedData.email);
      formData.append("dateOfBirth", editedData.dateOfBirth);
      if (editedFile) {
        formData.append("imageUrl", editedFile);
      }

      await axios.put(
        `https://localhost:7054/api/Admin/update-user/${editMember.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditMember(null);
      setEditedFile(null);
      fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleCancel = () => {
    setEditMember(null);
    setEditedFile(null);
  };

  return (
    <div className="view-member-wrapper">
      <table className="view-member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>
                <img
                  src={member.imageUrl || "default-avatar.png"}
                  alt={member.name}
                  className="view-member-img"
                />
              </td>
              <td>{member.phone}</td>
              <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
              <td>{member.email}</td>
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
            Change Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <div style={{ marginTop: "15px" }}>
            <button className="view-member-btn edit" onClick={handleSave}>Save</button>
            <button className="view-member-btn delete" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMember;
