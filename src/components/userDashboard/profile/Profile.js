


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    imageUrl: null, // dəyişir
    currentPassword: "",
    newPassword: "",
  });
  const [previewImage, setPreviewImage] = useState(""); // şəkil preview üçün
  const history = useHistory();

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    axios
      .get("https://localhost:7054/api/User/user-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          dateOfBirth: response.data.dateOfBirth || "",
          imageUrl: null,
          currentPassword: "",
          newPassword: "",
        });
        setPreviewImage(response.data.imageUrl || "/default-avatar.png");
      })
      .catch((error) => {
        console.error("Failed to load user profile:", error);
        history.push("/login");
      });
  }, [history]);

  const handleUpdate = () => {
    const form = new FormData();
    form.append("Name", formData.name);
    form.append("Email", formData.email);
    form.append("Phone", formData.phone);
    form.append("DateOfBirth", formData.dateOfBirth);
    if (formData.imageUrl) {
      form.append("ImageUrl", formData.imageUrl);
    }
    form.append("CurrentPassword", formData.currentPassword);
    form.append("NewPassword", formData.newPassword);

    axios
      .put(`https://localhost:7054/api/User/profile-update/${userProfile.id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Profile successfully updated!");
        setEditing(false);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        alert(error.response?.data || "An error occurred.");
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-name">{userProfile.name}</h2>
          <img
            src={previewImage}
            alt="Profile"
            className="profile-image"
          />
        </div>
        {editing ? (
  <div className="profile-form">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Name"
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
    />
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="Phone"
    />
    <input
      type="date"
      name="dateOfBirth"
      value={formatDate(formData.dateOfBirth)}
      onChange={handleChange}
      placeholder="Date of Birth"
    />
    <input
      type="file"
      name="imageUrl"
      onChange={handleChange}
      accept="image/*"
    />
    <input
      type="password"
      name="currentPassword"
      value={formData.currentPassword}
      onChange={handleChange}
      placeholder="Current Password"
    />
    <input
      type="password"
      name="newPassword"
      value={formData.newPassword}
      onChange={handleChange}
      placeholder="New Password"
    />

    <button onClick={handleUpdate} className="update-button">
      Update Profile
    </button>
    <button onClick={() => setEditing(false)} className="cancel-button">
      Cancel
    </button>
  </div>
) : (
  <div className="profile-details">
    <p>Email: {userProfile.email}</p>
    <p>Phone: {userProfile.phone || "Not provided"}</p>
    <p>Date of Birth: {formatDate(userProfile.dateOfBirth) || "Not provided"}</p>
    <button onClick={() => setEditing(true)} className="edit-button">
      Edit Profile
    </button>
  </div>
)}


      </div>
    </div>
  );
};

export default Profile;
