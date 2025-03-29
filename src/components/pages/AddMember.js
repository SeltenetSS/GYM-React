import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddMember.css";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: false,
    isApproved: false,
    phone: "",
    dateOfBirth: "",
    imageUrl: null,
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Stored Token:", localStorage.getItem("token"));
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("isActive", formData.isActive);
    data.append("isApproved", formData.isApproved);
    data.append("phone", formData.phone);
    data.append("dateOfBirth", formData.dateOfBirth);
    if (formData.imageUrl) {
      data.append("imageUrl", formData.imageUrl);
    }
  

    try {
      await axios.post('https://localhost:7054/api/Admin/add-user', data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // Token əlavə edin
        },
      });
     
      alert("User added successfully!");
      history.push("/admin-dashboard/member");
    } catch (error) {
      console.error("Error adding user:", error);
      console.log(localStorage.getItem("token"))
      alert("Failed to add user.");
      
    }
  };

  return (
    <div className="add-member-wrapper">
      <h2 className="add-member-title">Add New Member</h2>
      <form className="add-member-form" onSubmit={handleSubmit}>
        <div className="add-member-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="add-member-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="add-member-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="add-member-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="add-member-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="add-member-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div className="add-member-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isApproved"
              checked={formData.isApproved}
              onChange={handleChange}
            />
            Approved
          </label>
        </div>

        <div className="add-member-group">
          <label>Profile Image:</label>
          <input type="file" name="imageUrl" onChange={handleFileChange} />
        </div>

        <button className="add-member-button" type="submit">
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
