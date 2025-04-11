import React from "react";
import { FaBox, FaEye } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./Package.css"; 

const Package = () => {
  const history = useHistory();

  const handleAddPackage = () => history.push("/admin-dashboard/package/add-package");
  const handleViewPackage = () => history.push("/admin-dashboard/package/view-package");

  return (
    <div className="adminPackageCardsContainer">
      <div className="adminPackageCard" onClick={handleAddPackage}>
        <div className="adminPackageCardIcon">
          <FaBox size={30} />
        </div>
        <div className="adminPackageCardTitle">Add New Package</div>
      </div>

      <div className="adminPackageCard" onClick={handleViewPackage}>
        <div className="adminPackageCardIcon">
          <FaEye size={30} />
        </div>
        <div className="adminPackageCardTitle">View Package</div>
      </div>
    </div>
  );
};

export default Package;
