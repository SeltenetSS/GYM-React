import React, { useEffect, useState } from "react";
import axios from "axios";

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
        console.error("Profil yüklənmədi:", err);
        setMessage("Profil məlumatı alınarkən xəta baş verdi.");
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

      setMessage("Profil uğurla yeniləndi!");
    } catch (err) {
      const msg = err.response?.data?.message || "Yeniləmə zamanı xəta baş verdi.";
      setMessage(msg);
    }
  };

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div className="profile-container">
      <h2>Profilim</h2>
      {message && <p style={{ color: message.includes("xəta") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Yeni şəkil (əgər dəyişmək istəyirsənsə):</label>
          <input type="file" name="imageUrl" onChange={handleChange} />
        </div>

        {adminData?.imageUrl && (
          <div>
            <p>Mövcud şəkil:</p>
            <img
              src={adminData.imageUrl}
              alt="Profil şəkli"
              width="100"
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}

        <div>
          <label>Hazırkı şifrə:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Yeni şifrə:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Yenilə</button>
      </form>
    </div>
  );
}

export default Profile;
