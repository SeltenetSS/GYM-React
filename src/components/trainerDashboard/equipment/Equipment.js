import React, { useEffect, useState } from 'react';
import './Equipment.css';
import axios from "axios";

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
      setError("Failed to load equipment!");
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="trainerEquipment-container">
      <h1 className="trainerEquipment-title">Equipment</h1>
      {error && <p className="trainerEquipment-error">{error}</p>}
      <table className="trainerEquipment-table">
        <thead>
          <tr>
          <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Unit</th>
           
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((eq) => (
            <tr key={eq.id}>
                 <td>{eq.id}</td>
              <td>
                {eq.imageUrl ? (
                  <img src={eq.imageUrl} alt={eq.name} className="trainerEquipment-image" />
                ) : (
                  'None'
                )}
              </td>
              <td>{eq.name}</td>
              <td>{eq.description}</td>
              <td>{eq.price} ₼</td>
              <td>{eq.unit}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipment;
