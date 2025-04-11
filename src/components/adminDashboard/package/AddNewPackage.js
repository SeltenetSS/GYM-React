import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./AddNewPackage.css"; 

const AddNewPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: "",
    price: "",
    durationInMonths: "",
    description: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");
      
        console.log("Token: ", token); 
        
        const response = await axios.post(
          "https://localhost:7054/api/Package/add-package",
          packageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      
        if (response.status === 200) {
          alert("Package added successfully!");
          history.push("/admin-dashboard/packages");
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to add package");
      }
      
  };

  return (
    <div className="admin-add-package-page">
      <div className="admin-add-package-wrapper">
        <h2 className="admin-add-package-title">Add New Package</h2>
        {error && <p className="admin-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-add-package-form">
          <div className="admin-form-group">
            <label htmlFor="packageName">Package Name</label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              value={packageData.packageName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={packageData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={packageData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="durationInMonths">Duration (Months)</label>
            <input
              type="number"
              id="durationInMonths"
              name="durationInMonths"
              value={packageData.durationInMonths}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="admin-submit-button">
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPackage;

