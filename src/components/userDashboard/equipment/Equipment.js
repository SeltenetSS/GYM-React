import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Equipment.css";

const Equipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState("");

  const fetchEquipment = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Equipment/equipments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEquipmentList(response.data);
    } catch (err) {
      setError("Failed to load equipment");
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="user-dashboard-equipment-page">
      <h2>Equipment List</h2>
      {error && <p className="user-dashboard-error-message">{error}</p>}

      <div className="user-dashboard-equipment-cards">
        {equipmentList.length > 0 ? (
          equipmentList.map((equipment) => (
            <div className="user-dashboard-equipment-card" key={equipment.id}>
              <div className="user-dashboard-equipment-image-container">
                {equipment.imageUrl ? (
                  <img
                    src={equipment.imageUrl}
                    alt={equipment.name}
                    className="user-dashboard-equipment-image"
                  />
                ) : (
                  <div className="user-dashboard-no-image">No Image</div>
                )}
              </div>
              <div className="user-dashboard-equipment-info">
                <h3>{equipment.name}</h3>
                <p className="description">
                  {equipment.description || "No description available"}
                </p>
                
              
              </div>
            </div>
          ))
        ) : (
          <p>No equipment available.</p>
        )}
      </div>
    </div>
  );
};

export default Equipment;
