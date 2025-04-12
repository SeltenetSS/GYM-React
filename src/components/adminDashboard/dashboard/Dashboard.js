


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

  useEffect(() => {
    axios
      .get("https://localhost:7054/api/Admin/summary", {
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
  }, []);

  const cardData = [
    { title: "Members", count: stats.numberOfUsers },
    { title: "Trainers", count: stats.numberOfTrainers },
    { title: "Equipments", count: stats.numberOfEquipments },
    { title: "Packages", count: stats.numberOfPackages },
  ];

  const pieData = [
    { name: "Members", value: stats.numberOfUsers },
    { name: "Trainers", value: stats.numberOfTrainers },
    { name: "Equipments", value: stats.numberOfEquipments },
    { name: "Packages", value: stats.numberOfPackages },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444"];

  const getCardColorClass = (title) => {
    switch (title) {
      case "Members":
        return "bg-blue";
      case "Trainers":
        return "bg-green";
      case "Equipments":
        return "bg-yellow";
      case "Packages":
        return "bg-red";
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
          >
            <h2 className="card-title">{card.title}</h2>
            <p className="card-count">{card.count}</p>
          </div>
        ))}
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
                outerRadius={150} // Genişləndirildi
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
