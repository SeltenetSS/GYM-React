import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddTrainer.css";

const AddTrainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    isActive: false,
    isApproved: false,
    description: "",
    experience: "",
    salary: null,
    mobileTelephone: "",
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

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "imageUrl" && value) {
        data.append(key, value);
      } else if (key !== "imageUrl") {
        data.append(key, value);
      }
    });
 
    try {
      await axios.post("https://localhost:7054/api/Admin/add-trainer", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Trainer added successfully!");
      history.push("/admin-dashboard/trainer");
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("Failed to add trainer.");
    }
  };

  return (
    <div className="add-trainer-page">
      <div className="add-trainer-wrapper">
        <h2 className="add-trainer-title">Add New Trainer</h2>
        <form className="add-trainer-form" onSubmit={handleSubmit}>
          <div className="add-trainer-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="speciality">Speciality</label>
            <input
              id="speciality"
              name="speciality"
              type="text"
              placeholder="Trainer's Speciality"
              value={formData.speciality}
              onChange={handleChange}
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="mobileTelephone">Mobile Telephone</label>
            <input
              id="mobileTelephone"
              name="mobileTelephone"
              type="tel"
              placeholder="+994 XX XXX XX XX"
              value={formData.mobileTelephone}
              onChange={handleChange}
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="experience">Experience</label>
            <input
              id="experience"
              name="experience"
              type="text"
              placeholder="Trainer's experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              name="salary"
              type="number"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className="add-trainer-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Trainer's description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="add-trainer-group checkbox-group">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive">Active</label>
          </div>

          <div className="add-trainer-group checkbox-group">
            <input
              id="isApproved"
              name="isApproved"
              type="checkbox"
              checked={formData.isApproved}
              onChange={handleChange}
            />
            <label htmlFor="isApproved">Approved</label>
          </div>

          <div className="add-trainer-group">
            <label htmlFor="imageUrl">Profile Picture</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="add-trainer-button">
            Add Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;
