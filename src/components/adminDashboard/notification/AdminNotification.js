import React, { useState } from "react";
import axios from "axios";
import "./AdminNotification.css";
 
const AdminNotification = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
 
  const handleSendNotification = async () => {
    if (!message.trim()) {
      setStatus("Boş mesaj göndərilə bilməz.");
      return;
    }
 
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://localhost:7054/api/GlobalNotification", { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setStatus("Bildiriş uğurla göndərildi ✅");
      setMessage("");
    } catch (error) {
      console.error("Bildiriş göndərilə bilmədi", error);
      setStatus("Xəta baş verdi ❌");
    }
  };
 
  return (
    <div className="admin-notification-container">
      <h2>🌐 İstifadəçilərə mesaj göndərin</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mesajınızı buraya yazın..."
        className="notification-textarea"
      />
      <button onClick={handleSendNotification} className="send-btn">
        Göndər
      </button>
      {status && <div className="status-message">{status}</div>}
    </div>
  );
};
 
export default AdminNotification;