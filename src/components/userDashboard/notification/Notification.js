import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css";
 
const Notification = () => {
  const [personalNotifs, setPersonalNotifs] = useState([]);
  const [globalNotifs, setGlobalNotifs] = useState([]);
 
  useEffect(() => {
    fetchNotifications();
  }, []);
 
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
 
      const [personalRes, globalRes] = await Promise.all([
        axios.get("https://localhost:7054/api/Notification/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get("https://localhost:7054/api/GlobalNotification", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);
 
      setPersonalNotifs(personalRes.data);
      setGlobalNotifs(globalRes.data);
    } catch (error) {
      console.error("Bildirişlər gətirilərkən xəta baş verdi", error);
    }
  };
 
  const markAsRead = async (id, isGlobal) => {
    try {
      const token = localStorage.getItem("token");
 
      if (isGlobal) {
       
        await axios.put(`https://localhost:7054/api/GlobalNotification/mark-as-read/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
       
        await axios.put(`https://localhost:7054/api/Notification/mark-as-read/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
 
      fetchNotifications();
    } catch (error) {
      console.error("Bildirişi oxundu kimi qeyd etmək mümkün olmadı", error);
    }
  };
 
  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7054/api/Notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch (error) {
      console.error("Bildirişi silmək mümkün olmadı", error);
    }
  };
 
  return (
    <div className="notification-container">
      <h2 className="notification-title">🔔 Bildirişlər</h2>
 
      <div className="section">
        <h3>📬 Şəxsi Bildirişlər</h3>
        {personalNotifs.length === 0 ? (
          <p className="empty-text">Bildiriş yoxdur.</p>
        ) : (
          <ul className="notification-list">
            {personalNotifs.map((notif) => (
              <li
                key={notif.id}
                className={`notification-item ${notif.isRead ? "read" : "unread"}`}
              >
                <div className="notification-message">{notif.message}</div>
                <div className="notification-meta">
                  <span>{new Date(notif.createdAt).toLocaleString()}</span>
                  <div className="button-group">
                    {!notif.isRead && (
                      <button onClick={() => markAsRead(notif.id, false)} className="btn read-btn">
                        Oxundu
                      </button>
                    )}
                    <button onClick={() => deleteNotification(notif.id)} className="btn delete-btn">
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <div className="section">
        <h3>🌐 Qlobal Bildirişlər</h3>
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
                      <button onClick={() => markAsRead(notif.id, true)} className="btn read-btn">
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
    </div>
  );
};
 
export default Notification;
 
 
 