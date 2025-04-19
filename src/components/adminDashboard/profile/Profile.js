import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

function Profile() {
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    imageUrl: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://localhost:7054/api/Admin/admin-profile/${adminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdminData(res.data);
        setFormData((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
      } catch (err) {
        console.error("Profile not loaded:", err);
        setMessage("Error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [adminId, token]);

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
    data.append("Name", formData.name);
    data.append("Email", formData.email);
    if (formData.imageUrl) data.append("ImageUrl", formData.imageUrl);
    if (formData.currentPassword) data.append("CurrentPassword", formData.currentPassword);
    if (formData.newPassword) data.append("NewPassword", formData.newPassword);

    try {
      await axios.put(`https://localhost:7054/api/Admin/update-admin/${adminId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Profile successfully updated!");
    } catch (err) {
      const msg = err.response?.data?.message || "Error occurred while updating.";
      setMessage(msg);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {message && (
        <p className="profile-message" style={{ color: message.includes("Error") ? "red" : "limegreen" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="profile-input-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-input-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-input-field">
          <label htmlFor="imageUrl">New image (if you want to change it):</label>
          <input type="file" name="imageUrl" id="imageUrl" onChange={handleChange} />
        </div>

        {adminData?.imageUrl && (
          <div className="profile-image-wrapper">
            <p>Current image:</p>
            <img src={adminData.imageUrl} alt="Profile image" className="profile-image" />
          </div>
        )}

        <div className="profile-input-field">
          <label htmlFor="currentPassword">Current password:</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="profile-input-field">
          <label htmlFor="newPassword">New password:</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="admin-profile-button">Update</button>
      </form>
    </div>
  );
}

export default Profile;
