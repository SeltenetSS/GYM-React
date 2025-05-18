// import React, { useEffect, useMemo, useState } from "react";
// import { HubConnectionBuilder } from "@microsoft/signalr";
// import "./chatstyles.css"
// const GuestChat = () => {
//   const [connection, setConnection] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const guestId = useMemo(() => {
//     const existing = localStorage.getItem("guestId");
//     if (existing) return existing;

//     const newId = `guest-${Math.floor(Math.random() * 100000)}`;
//     localStorage.setItem("guestId", newId);
//     return newId;
//   }, []);

//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder()
//       .withUrl("https://localhost:7054/chathub?userId=" + guestId)
//       .withAutomaticReconnect()
//       .build();

//     setConnection(newConnection);
//   }, [guestId]);

//   useEffect(() => {
//     if (connection) {
//       connection
//         .start()
//         .then(() => {
//           console.log("SignalR bağlantısı quruldu");
//           connection.invoke("JoinGroup", guestId, 'admin');

//           connection.off("ReceiveMessage");
//           connection.on("ReceiveMessage", (message, senderId) => {
//             setMessages((prev) => [...prev, { content: message, isAdmin: senderId === 'admin' }]);
//           });
//         })
//         .catch((err) => console.error("SignalR error:", err));
//     }
//   }, [connection, guestId]);

//   const handleSend = async () => {
//     if (connection && input.trim() !== "") {
//       await connection.invoke("SendMessage", 'admin', input);
//       setInput(""); // Clear input after sending
//     }
//   };

//   return (
//     <>
//       <button
//         className="chat-toggle-button"
//         onClick={() => setIsChatOpen((prev) => !prev)}
//       >
//         💬
//       </button>

//       {isChatOpen && (
//         <div className={`guest-chat-box ${isChatOpen ? "open" : ""}`}>
//           <button
//             className="chat-close-button"
//             onClick={() => setIsChatOpen(false)}
//           >
//             ×
//           </button>

//           <div className="chat-messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`chat-message ${msg.isAdmin ? "admin-message" : "guest-message"}`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Mesaj yaz..."
//             />
//             <button onClick={handleSend} disabled={input.trim() === ""}>
//               Göndər
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestChat;

import React, { useEffect, useMemo, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import './chatstyles.css'
const GuestChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
 
 
  const guestId = useMemo(() => {
    const existing = localStorage.getItem("guestId");
    if (existing) return existing;
 
    const newId = `guest-${Math.floor(Math.random() * 100000)}`;
    localStorage.setItem("guestId", newId);
    return newId;
  }, []);
 
 
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7054/chathub?userId=" + guestId)
      .withAutomaticReconnect()
      .build();
 
    setConnection(newConnection);
  }, [guestId]);
 
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR bağlantısı quruldu");
          connection.invoke("JoinGroup", guestId, 'admin');
 
         
          connection.off("ReceiveMessage");  
          connection.on("ReceiveMessage", (message, senderId) => {
            setMessages(prev => [...prev, { content: message, isAdmin: senderId === 'admin' }]);
          });
        })
        .catch(err => console.error("SignalR error:", err));
    }
  }, [connection, guestId]);
 
 
 
<div className="chat-messages">
    {messages.map((msg, index) => (
        <div
            key={index}
            className={`chat-message ${msg.isAdmin ? "admin-message" : "guest-message"}`}
        >
            {msg.content}
        </div>
    ))}
</div>
 
    const handleSend = async () => {
    if (connection && input.trim() !== "") {
     
      await connection.invoke("SendMessage", 'admin', input);
   
      setInput("");
    }
  };
 
 
  return (
    <>
   
      <button
        className="chat-toggle-button"
        onClick={() => setIsChatOpen(prev => !prev)}
      >
        💬
      </button>
 
   
      {isChatOpen && (
        <div className="guest-chat-box">
          <button
            className="chat-close-button"
            onClick={() => setIsChatOpen(false)}
          >
            ×
          </button>
 
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.isAdmin ? "admin-message" : "guest-message"}`}
              >
               
                {msg.content}
              </div>
            ))}
          </div>
 
          <div className="chat-input" style={{ display: "flex", gap: "6px" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Mesaj yaz..."
            />
            <button onClick={handleSend}>Göndər</button>
          </div>
        </div>
      )}
    </>
  );
};
 
export default GuestChat;