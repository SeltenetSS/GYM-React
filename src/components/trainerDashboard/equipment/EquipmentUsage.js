import React from 'react';
import { Link } from 'react-router-dom';
import './EquipmentUsage.css';

const EquipmentUsage = () => {
  return (
    <div className="equipmentusagemain-container">
      <div className="equipmentusagemain-card-wrapper">
        <div className="equipmentusagemain-card">
          <h3>Add<br></br> Equipment Usage</h3>
          <Link to="/trainer-dashboard/equipmentusage/add-usage">
            <button>Add Usage</button>
          </Link>
        </div>

        <div className="equipmentusagemain-card">
          <h3>View Equipment Usage</h3>
          <Link to="/trainer-dashboard/equipmentusage/view-usage">
            <button>View Usage</button>
          </Link>
        </div>

        <div className="equipmentusagemain-card">
          <h3>View Equipment Usage Chart</h3>
          <Link to="/trainer-dashboard/equipmentusage/view-chart">
            <button>View Chart</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EquipmentUsage;
