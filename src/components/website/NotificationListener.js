import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
 
const NotificationListener = ({ accessToken }) => {
  useEffect(() => {
    console.log("Token:", accessToken);
    if (!accessToken) return;
 
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7054/hubs/notification", {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();
 
    connection.on("ReceiveNotification", (message) => {
      console.log("Yeni bildiriş:", message);
      alert(message);
    });
    connection.on("ReceiveGlobalNotification", (message) => {
        console.log("QLOBAL bildiriş:", message);
        alert("[GLOBAL] " + message);
      });
 
    connection
      .start()
      .then(() => console.log("SignalR bağlantısı uğurla başladı"))
      .catch((err) => console.error("Bağlantı xətası:", err));
 
    return () => {
      connection.stop();
    };
  }, [accessToken]);
 
  return null;
};
 
export default NotificationListener;