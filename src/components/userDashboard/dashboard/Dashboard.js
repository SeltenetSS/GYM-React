// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     numberOfUsers: 0,
//     numberOfTrainers: 0,
//     numberOfEquipments: 0,
//     numberOfPackages: 0,
//   });

//   const [topUsers, setTopUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://localhost:7054/api/User/summary-for-user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => setStats(res.data))
//       .catch((err) => console.error("Failed to load statistics:", err));

//     axios
//       .get("https://localhost:7054/api/User/top-users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => setTopUsers(res.data))
//       .catch((err) => console.error("Failed to load top users:", err));
//   }, []);

//   const cardData = [
//     { title: "Trainers", count: stats.numberOfTrainers, icon: "🏋️" },
//     { title: "Equipments", count: stats.numberOfEquipments, icon: "🛠️" },
//     { title: "Packages", count: stats.numberOfPackages, icon: "📦" },
//   ];

//   const pieData = [
//     { name: "Trainers", value: stats.numberOfTrainers },
//     { name: "Equipments", value: stats.numberOfEquipments },
//     { name: "Packages", value: stats.numberOfPackages },
//   ];

//   const COLORS = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444"];

//   const getCardColorClass = (title) => {
//     switch (title) {
//       case "Trainers":
//         return "bg-blue";
//       case "Equipments":
//         return "bg-green";
//       case "Packages":
//         return "bg-yellow";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Dashboard</h1>

//       <div className="dashboard-cards">
//         {cardData.map((card, index) => (
//           <div
//             key={index}
//             className={`dashboard-card ${getCardColorClass(card.title)}`}
//             data-icon={card.icon}
//           >
//             <h2 className="card-title">{card.title}</h2>
//             <p className="card-count">{card.count}</p>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-bottom">
//         <div className="top-users-table">
//           <h2 className="table-title">Top 10 Users</h2>
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Point</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topUsers.map((user, index) => (
//                 <tr key={user.userId}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {user.imageUrl ? (
//                       <img
//                         src={user.imageUrl}
//                         alt={user.name}
//                         className="user-image"
//                       />
//                     ) : (
//                       <span className="no-image">No Image</span>
//                     )}
//                   </td>
//                   <td>{user.name}</td>
//                   <td>{user.point}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="chart-container">
//           <h2 className="chart-title">Summary Chart</h2>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150} // Genişləndirildi
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    numberOfUsers: 0,
    numberOfTrainers: 0,
    numberOfEquipments: 0,
    numberOfPackages: 0,
  });

  const [topUsers, setTopUsers] = useState([]);
  const [packageInfo, setPackageInfo] = useState(null); 

  useEffect(() => {
    axios
      .get("https://localhost:7054/api/User/summary-for-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load statistics:", err));

    axios
      .get("https://localhost:7054/api/User/top-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTopUsers(res.data))
      .catch((err) => console.error("Failed to load top users:", err));

 
    axios
      .get("https://localhost:7054/api/User/package-info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPackageInfo(res.data))
      .catch((err) => console.error("Failed to load package info:", err));
  }, []);

  const cardData = [
    { title: "Trainers", count: stats.numberOfTrainers, icon: "🏋️" },
    { title: "Equipments", count: stats.numberOfEquipments, icon: "🛠️" },
    { title: "Packages", count: stats.numberOfPackages, icon: "📦" },
  ];

  const pieData = [
    { name: "Trainers", value: stats.numberOfTrainers },
    { name: "Equipments", value: stats.numberOfEquipments },
    { name: "Packages", value: stats.numberOfPackages },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444"];

  const getCardColorClass = (title) => {
    switch (title) {
      case "Trainers":
        return "bg-blue";
      case "Equipments":
        return "bg-green";
      case "Packages":
        return "bg-yellow";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`dashboard-card ${getCardColorClass(card.title)}`}
            data-icon={card.icon}
          >
            <h2 className="card-title">{card.title}</h2>
            <p className="card-count">{card.count}</p>
          </div>
        ))}

        {packageInfo && (
          <div className="dashboard-card bg-purple">
            <h2 className="card-title2" >Your Package</h2>
            <p className="card-count">{packageInfo.packageName}</p>
            <p>Price: ${packageInfo.packagePrice}</p>
            <p>Trainer: {packageInfo.trainerName || "Not Assigned"}</p>
            <p>Group: {packageInfo.groupName || "Not Assigned"}</p>
          </div>
        )}
      </div>

      <div className="dashboard-bottom">
        <div className="top-users-table">
          <h2 className="table-title">Top 10 Users</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="user-image"
                      />
                    ) : (
                      <span className="no-image">No Image</span>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Summary Chart</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
