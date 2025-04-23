import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: null,
    currentPassword: "",
    newPassword: "",
  });
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/Admin/admin-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          imageUrl: null,
          currentPassword: "",
          newPassword: "",
        });
        setAdminId(response.data.id);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
      setFormData({ ...formData, imageUrl: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await axios.put(`https://localhost:7054/api/Admin/update-admin/${adminId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="admin-profile-container">
      <h1 className="admin-profile-title">Admin Profile</h1>
      <form onSubmit={handleSubmit} className="admin-profile-form">
        {profile.imageUrl && (
          <img
            src={profile.imageUrl}
            alt="Profile"
            className="admin-profile-image"
          />
        )}
        <div className="admin-profile-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="admin-profile-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="admin-profile-group">
          <label>New Image:</label>
          <input type="file" name="imageUrl" onChange={handleChange} />
        </div>
        <div className="admin-profile-group">
          <label>Current Password:</label>
          <input type="password" name="currentPassword" onChange={handleChange} />
        </div>
        <div className="admin-profile-group">
          <label>New Password:</label>
          <input type="password" name="newPassword" onChange={handleChange} />
        </div>
        <button type="submit" className="admin-profile-button">Update</button>
      </form>
    </div>
  );
};

export default Profile;
