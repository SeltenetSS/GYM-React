import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css";
 
const Notification = () => {
  const [globalNotifs, setGlobalNotifs] = useState([]);
 
  useEffect(() => {
    fetchGlobalNotifications();
  }, []);
 
  const fetchGlobalNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7054/api/GlobalNotification/trainer", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGlobalNotifs(response.data);
    } catch (error) {
      console.error("Qlobal bildirişlər gətirilərkən xəta baş verdi", error);
    }
  };
 
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
 
      await axios.put(`https://localhost:7054/api/GlobalNotification/trainer/mark-as-read/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      fetchGlobalNotifications();
    } catch (error) {
      console.error("Bildirişi oxundu kimi qeyd etmək mümkün olmadı", error);
    }
  };
 
  return (
    <div className="notification-container">
      <h2 className="notification-title">🔔 Bildirişlər</h2>
 
      {globalNotifs.length === 0 ? (
        <p className="empty-text">Qlobal bildiriş yoxdur.</p>
      ) : (
        <ul className="notification-list">
          {globalNotifs.map((notif, index) => (
            <li
              key={index}
              className={`notification-item global ${notif.isRead ? "read" : "unread"}`}
            >
              <div className="notification-message">{notif.message}</div>
              <div className="notification-meta">
                <span>{new Date(notif.createdAt).toLocaleString()}</span>
                <div className="button-group">
                  {!notif.isRead && (
                    <button onClick={() => markAsRead(notif.id)} className="btn read-btn">
                      Oxundu
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default Notification;