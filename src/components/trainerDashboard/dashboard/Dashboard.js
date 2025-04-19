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
    totalMember: 0,
    totalMyMember: 0,
    totalEquipment: 0,
    numberOfPackages: 0,
  });

  useEffect(() => {
    axios
      .get("https://localhost:7054/api/Trainer/statistics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load trainer statistics:", err));
  }, []);

  const cardData = [
    { title: "All Members", count: stats.totalMember },
    { title: "My Members", count: stats.totalMyMember },
    { title: "Equipments", count: stats.totalEquipment },
    { title: "Packages", count: stats.numberOfPackages },
  ];

  const pieData = [
    { name: "All Members", value: stats.totalMember },
    { name: "My Members", value: stats.totalMyMember },
    { name: "Equipments", value: stats.totalEquipment },
    { name: "Packages", value: stats.numberOfPackages },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444"];

  const getCardColorClass = (title) => {
    switch (title) {
      case "All Members":
        return "trainer-dashboard-bg-gray";
      case "My Members":
        return "trainer-dashboard-bg-blue";
      case "Equipments":
        return "trainer-dashboard-bg-yellow";
      case "Packages":
        return "trainer-dashboard-bg-red";
      default:
        return "";
    }
  };

  return (
    <div className="trainer-dashboard-container">
      <h1 className="trainer-dashboard-title">Trainer Dashboard</h1>

      <div className="trainer-dashboard-cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`trainer-dashboard-card ${getCardColorClass(card.title)}`}
          >
            <h2 className="trainer-dashboard-card-title">{card.title}</h2>
            <p className="trainer-dashboard-card-count">{card.count}</p>
          </div>
        ))}
      </div>

      <div className="trainer-dashboard-bottom">
        <div className="trainer-dashboard-chart-container">
          <ResponsiveContainer width="100%" height={400}>
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
