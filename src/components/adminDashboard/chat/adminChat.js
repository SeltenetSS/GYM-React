import React, { useEffect, useState, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import "./AdminChat.css"; 
const AdminChat = () => {
  const [connection, setConnection] = useState(null);
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [guests, setGuests] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7054/chathub?userId=admin`)
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log("Admin connected to SignalR");
      })
      .catch(err => {
        console.error("SignalR connection error:", err);
        alert("Xəta: SignalR bağlantısı qurulmadı.");
      });


    newConnection.on("NewGuestConnected", (guestId) => {
      setGuests(prev => [...new Set([...prev, guestId])]); 
    });

   
    newConnection.on("ReceiveMessage", (message, fromUserId) => {
    
      if (fromUserId !== 'admin') {
        setMessages(prev => [...prev, { from: fromUserId, text: message }]);
      }
    });
    
    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  const handleGuestSelect = (guestId) => {
    setSelectedGuestId(guestId);
    if (connection) {
      connection.invoke("JoinGroup", guestId, guestId)
        .then(() => {
          console.log(`${guestId} qrupuna qoşulub.`);
        })
        .catch(err => {
          console.error("JoinGroup metodunda xəta:", err);
          alert("Xəta: Qrupa qoşularkən problem yarandı.");
        });
    }
  };

  const sendMessage = async () => {
    if (connection && selectedGuestId && message) {
      try {
        await connection.invoke("SendMessage", selectedGuestId, message);
        setMessages(prev => [...prev, { from: 'admin', text: message }]); 
        setMessage('');
      } catch (err) {
        console.error("Mesaj göndərilmədi:", err);
        alert("Mesaj göndərilmədi!");
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '220px', borderRight: '1px solid gray', padding: '10px' }}>
        <h4>Qonaqlar</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {guests.map((guest, index) => (
            <li
              key={index}
              style={{
                cursor: 'pointer',
                fontWeight: guest === selectedGuestId ? 'bold' : 'normal',
                padding: '5px 0',
              }}
              onClick={() => handleGuestSelect(guest)}
            >
              {guest}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        <h4>Mesajlaşma: {selectedGuestId || '---'}</h4>
        <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.from === 'admin' ? 'right' : 'left', marginBottom: '5px' }}>
              <b>{msg.from}:</b> {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Mesaj yaz..."
            style={{ width: '80%', padding: '5px' }}
          />
          <button onClick={sendMessage} style={{ marginLeft: '10px' }}>Göndər</button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;


