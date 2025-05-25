
import React, { useEffect, useState, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import "./AdminChat.css";

const AdminChat = () => {
  const [connection, setConnection] = useState(null);
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [message, setMessage] = useState('');
  const [messagesByGuest, setMessagesByGuest] = useState({});
  const [guestLabels, setGuestLabels] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7054/chathub?userId=admin`)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => console.log("Admin connected"))
      .catch(err => console.error("Connection error:", err));

    newConnection.on("ReceiveMessage", (message, fromUserId) => {
      if (fromUserId === 'admin') return;

      setMessagesByGuest(prev => {
        const updated = { ...prev };
        if (updated[fromUserId]) {
          updated[fromUserId] = updated[fromUserId].map(msg =>
            msg.from === 'admin' ? { ...msg, read: true } : msg
          );
        } else {
          updated[fromUserId] = [];
        }

        updated[fromUserId].push({ from: fromUserId, text: message });
        return updated;
      });

      setGuestLabels(prev => {
        if (prev[fromUserId]) return prev;
        const count = Object.keys(prev).length + 1;
        return { ...prev, [fromUserId]: `Guest #${count}` };
      });
    });

    setConnection(newConnection);
    return () => newConnection.stop();
  }, []);

  const handleGuestSelect = (guestId) => {
    setSelectedGuestId(guestId);
    if (connection) {
      connection.invoke("JoinGroup", guestId, guestId)
        .catch(err => console.error("JoinGroup error:", err));
    }
  };

  const sendMessage = async () => {
    if (connection && selectedGuestId && message.trim()) {
      try {
        await connection.invoke("SendMessage", selectedGuestId, message);
        setMessagesByGuest(prev => {
          const updated = { ...prev };
          if (!updated[selectedGuestId]) {
            updated[selectedGuestId] = [];
          }
          updated[selectedGuestId].push({
            from: 'admin',
            text: message,
            read: false
          });
          return updated;
        });
        setMessage('');
      } catch (err) {
        console.error("Send error:", err);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesByGuest, selectedGuestId]);

  const guestList = Object.keys(messagesByGuest);

  return (
    <div className="adminchat-container">
      <div className="adminchat-user-list">
        <h4>Chat</h4>
        <ul className="adminchat-guest-list">
          {guestList.map((guestId, index) => (
            <li
              key={index}
              className={`adminchat-guest-item ${guestId === selectedGuestId ? 'adminchat-active' : ''}`}
              onClick={() => handleGuestSelect(guestId)}
            >
              {guestLabels[guestId] || guestId}
            </li>
          ))}
        </ul>
      </div>

      <div className="adminchat-chat-section">
        <div className="adminchat-chat-header">
          {guestLabels[selectedGuestId] || 'Qonaq seçilməyib'}
        </div>

        <div className="adminchat-chat-messages">
          {(messagesByGuest[selectedGuestId] || []).map((msg, i) => (
            <div key={i} className={`adminchat-message ${msg.from === 'admin' ? 'adminchat-admin-message' : 'adminchat-guest-message'}`}>
              <strong>{msg.from === 'admin' ? 'Admin' : guestLabels[msg.from] || msg.from}:</strong> {msg.text}
              {msg.from === 'admin' && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {msg.read ? 'Read' : 'Unread'}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="adminchat-chat-input">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Mesaj yaz..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
