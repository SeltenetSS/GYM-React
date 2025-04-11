import React from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./Equipment.css"; 

const Equipment = () => {
  const history = useHistory();

  const handleAddEquipment = () => history.push("/admin-dashboard/equipment/add-equipment");
  const handleViewEquipment = () => history.push("/admin-dashboard/equipment/view-equipment");

  return (
    <div className="adminEquipmentCardsContainer">
      <div className="adminEquipmentCard" onClick={handleAddEquipment}>
        <div className="adminEquipmentCardIcon">
          <FaPlus size={30} />
        </div>
        <div className="adminEquipmentCardTitle">Add New Equipment</div>
      </div>

      <div className="adminEquipmentCard" onClick={handleViewEquipment}>
        <div className="adminEquipmentCardIcon">
          <FaEye size={30} />
        </div>
        <div className="adminEquipmentCardTitle">View Equipment</div>
      </div>
    </div>
  );
};

export default Equipment;
